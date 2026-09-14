package dailybit_judge.system.judge.services;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

import dailybit_judge.system.judge.dtos.TestCaseDTO;
import dailybit_judge.system.judge.enums.SubmissionStatus;
import dailybit_judge.system.judge.exceptions.CompileException;
import dailybit_judge.system.judge.exceptions.JudgeRuntimeException;
import dailybit_judge.system.judge.exceptions.MemoryLimitExceededException;
import dailybit_judge.system.judge.exceptions.ServerErrorException;
import dailybit_judge.system.judge.exceptions.TimeLimitExceededException;
import dailybit_judge.system.judge.models.Submission;

@Service
public class JavaRunService {

    private static final String IMAGE = "eclipse-temurin:17-jdk";
    private static final String HOST_SCRATCH_ROOT = "/home/zahin/Desktop/tmp"; // real host path (docker daemon's view)
    private static final String CONTAINER_SCRATCH_ROOT = "/home/zahin/Desktop/DailyBit/dailybit_judge/tmp-codes"; // this app's own mounted view
    private static final long COMPILE_TIMEOUT_SECONDS = 15;
    private static final long OUTER_WAIT_BUFFER_SECONDS = 3;

    // ---- ENTRY POINT ----

    public void process(Submission submission, List<TestCaseDTO> testCases) {
        Path appSideDir = Path.of(CONTAINER_SCRATCH_ROOT, "submission-" + submission.getId());
        Path hostSideDir = Path.of(HOST_SCRATCH_ROOT, "submission-" + submission.getId());

        try {
            saveCodeToFile(appSideDir, submission.getCode());
            compile(hostSideDir);

            if (testCases == null || testCases.isEmpty()) {
                // just run once, return output, nothing persisted
                String output = run(hostSideDir, null, 5, 256);
                submission.setStatus(SubmissionStatus.FINISHED);
                submission.setDescp(output);
                return;
            }

            boolean allPassed = true;
            for (TestCaseDTO tc : testCases) {
                double timeLimit = tc.getTimeLimit() != null ? tc.getTimeLimit() : 2.0;
                int memoryLimit = tc.getMemoryLimit() != null ? tc.getMemoryLimit() : 256;

                String actual = null;
                try {
                    actual = run(hostSideDir, tc.getInput(), timeLimit, memoryLimit);
                } catch (TimeLimitExceededException | MemoryLimitExceededException | JudgeRuntimeException e) {
                    submission.setStatus(statusFor(e));
                    submission.setDescp(e.getMessage());
                }

                if (!normalize(actual).equals(normalize(tc.getOutput()))) {
                    allPassed = false;
                    break;
                }
            }

            submission.setStatus(allPassed ? SubmissionStatus.ACCEPTED : SubmissionStatus.WRONG_ANSWER);

        } catch (CompileException e) {
            submission.setStatus(SubmissionStatus.COMPILATION_ERROR);
            submission.setDescp(e.getMessage());
        } catch (ServerErrorException e) {
            submission.setStatus(SubmissionStatus.SERVER_ERROR);
            submission.setDescp(e.getMessage());
        } finally {
            cleanup(appSideDir);
        }
    }

    // ---- STEP 1: SAVE CODE TO FILE ----

    private void saveCodeToFile(Path appSideDir, String code) {
        try {
            Files.createDirectories(appSideDir);
            Files.writeString(appSideDir.resolve("Solution.java"), code, StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new ServerErrorException("Failed to write submission source to disk", e);
        }
    }

    // ---- STEP 2: COMPILE ----

    private void compile(Path hostSideDir) {
        ProcessBuilder pb = new ProcessBuilder(
                "docker", "run", "--rm",
                "-v", hostSideDir.toString() + ":/box",
                "--network", "none",
                "--memory", "256m",
                "--pids-limit", "64",
                IMAGE,
                "sh", "-c", "cd /box && javac Solution.java"
        );
        pb.redirectErrorStream(true);

        Process process;
        String output;
        int exitCode;

        try {
            process = pb.start();
            output = new String(process.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            boolean finished = process.waitFor(COMPILE_TIMEOUT_SECONDS, TimeUnit.SECONDS);
            if (!finished) {
                process.destroyForcibly();
                throw new ServerErrorException("Compilation timed out unexpectedly");
            }
            exitCode = process.exitValue();
        } catch (IOException e) {
            throw new ServerErrorException("Failed to invoke docker for compilation", e);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new ServerErrorException("Compilation interrupted");
        }

        if (exitCode != 0) {
            throw new CompileException(output);
        }
    }

    // ---- STEP 3: RUN ----

    private String run(Path hostSideDir, String input, double timeLimitSeconds, int memoryLimitMb) {
        long outerWaitSeconds = (long) Math.ceil(timeLimitSeconds) + OUTER_WAIT_BUFFER_SECONDS;

        ProcessBuilder pb = new ProcessBuilder(
                "docker", "run", "--rm", "-i",
                "-v", hostSideDir.toString() + ":/box",
                "--network", "none",
                "--memory", memoryLimitMb + "m",
                "--pids-limit", "64",
                IMAGE,
                "sh", "-c", "cd /box && timeout " + timeLimitSeconds + "s java Solution"
        );

        Process process;
        String stdout;
        String stderr;
        int exitCode;

        try {
            process = pb.start();

            if (input != null) {
                try (OutputStream stdin = process.getOutputStream()) {
                    stdin.write(input.getBytes(StandardCharsets.UTF_8));
                    stdin.flush();
                } catch (IOException e) {
                    // program may exit before reading all stdin — not necessarily fatal, ignore
                    throw new ServerErrorException("Input Error");
                }
            } else {
                process.getOutputStream().close();
            }

            stdout = new String(process.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            stderr = new String(process.getErrorStream().readAllBytes(), StandardCharsets.UTF_8);

            boolean finished = process.waitFor(outerWaitSeconds, TimeUnit.SECONDS);
            if (!finished) {
                process.destroyForcibly();
                throw new TimeLimitExceededException("Execution exceeded outer wait limit");
            }
            exitCode = process.exitValue();

        } catch (IOException e) {
            throw new ServerErrorException("Failed to invoke docker for execution", e);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new ServerErrorException("Execution interrupted");
        }

        if (exitCode == 124) {
            throw new TimeLimitExceededException("Time limit exceeded");
        }
        if (exitCode == 137) {
            // 128 + 9 (SIGKILL) — typically OOM-killed by the memory cgroup limit
            throw new MemoryLimitExceededException("Memory limit exceeded");
        }
        if (exitCode != 0) {
            throw new JudgeRuntimeException(stderr.isBlank() ? "Runtime error (exit code " + exitCode + ")" : stderr);
        }

        return stdout;
    }

    // ---- HELPERS ----

    private SubmissionStatus statusFor(RuntimeException e) {
        if (e instanceof TimeLimitExceededException) return SubmissionStatus.TIME_LIMIT_EXCEEDED;
        if (e instanceof MemoryLimitExceededException) return SubmissionStatus.MEMORY_LIMIT_EXCEEDED;
        return SubmissionStatus.RUNTIME_ERROR;
    }

    private String normalize(String s) {
        return s == null ? "" : s.strip().replaceAll("\\r\\n", "\n");
    }

    private void cleanup(Path appSideDir) {
        try {
            if (Files.exists(appSideDir)) {
                Files.walk(appSideDir)
                     .sorted(Comparator.reverseOrder())
                     .forEach(p -> {
                         try {
                             Files.delete(p);
                         } catch (IOException ignored) {
                             // best-effort cleanup
                         }
                     });
            }
        } catch (IOException ignored) {
            // best-effort cleanup
        }
    }
}