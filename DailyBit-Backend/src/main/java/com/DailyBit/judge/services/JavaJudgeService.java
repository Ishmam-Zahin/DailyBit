package com.DailyBit.judge.services;

import com.DailyBit.judge.Repository.ProblemRepo;
import com.DailyBit.judge.Repository.TestCaseRepo;
import com.DailyBit.judge.exceptionModel.JudgeException;
import com.DailyBit.judge.models.Problem;
import com.DailyBit.judge.models.TestCase;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;


@Service
public class JavaJudgeService {

    private ProblemRepo problemRepo;
    private TestCaseRepo testCaseRepo;

    private final Path javaBase = Path.of(System.getProperty("user.dir"), "judge", "java");
    private final String javaImageName = "openjdk:26-slim";
    private final String javaFileName = "Solution";


    public JavaJudgeService(ProblemRepo problemRepo, TestCaseRepo testCaseRepo) throws IOException {
        this.problemRepo = problemRepo;
        this.testCaseRepo = testCaseRepo;

        if(!Files.exists(javaBase)){
            Files.createDirectories(javaBase);
        }
    }

    private ProcessBuilder getCompileProcessBuilder(Path dir){
        ProcessBuilder pb = new ProcessBuilder(
                "docker", "run", "--rm",
                "-v", dir + ":/home", javaImageName,
                "javac", "/home/" + javaFileName + ".java"
        );
        pb.redirectErrorStream(true);

        return  pb;
    }

    private ProcessBuilder getExecuteProcessBuilder(Path dir, int ulimit, int timeout){
        ProcessBuilder pb = new ProcessBuilder(
                "docker", "run", "--rm", "-i",
                "--memory=256m", "--cpus=1",
                "-v", dir + ":/home", javaImageName,
                "bash", "-c", "ulimit -t " + ulimit + "; timeout " + timeout + " java -cp /home " + javaFileName
        );
        pb.redirectErrorStream(true);

        return  pb;
    }

    private Path createTempJavaFile(String code) throws IOException {
        Path tmpDir = Files.createTempDirectory(this.javaBase, "temp_");
        Path tmpJavaFile = tmpDir.resolve(this.javaFileName + ".java");
        Files.writeString(tmpJavaFile, code);

        return tmpDir;
    }

    private void compileJava(Path tmpDir) throws IOException, InterruptedException, JudgeException {
        ProcessBuilder compilePb = this.getCompileProcessBuilder(tmpDir);
        Process p = compilePb.start();
        String output = new String(p.getInputStream().readAllBytes());
        int exitCode = p.waitFor();
        if(exitCode != 0){
            throw new JudgeException("Compilation Error: " + output);
        }
    }

    private String runJava(Path tmpDir, String input, int ulimit, int timeout) throws IOException, InterruptedException, JudgeException {
        String result;

        ProcessBuilder runPb = this.getExecuteProcessBuilder(tmpDir, ulimit, timeout);
        Process p = runPb.start();
        if(input != null){
            try(var writer = new PrintWriter(p.getOutputStream())){
                writer.write(input);
                writer.flush();
            }
        }
        result = new String(p.getInputStream().readAllBytes());
        int exitCode = p.waitFor();

        if(exitCode != 0){
            if(exitCode == 137 || exitCode == 124){
                throw new JudgeException("Runtime Error: Time Limit Exceeded");
            }
            throw new JudgeException("Runtime Error: " + result);
        }

        return result;
    }

    private void matchResult(String expected, String actual) throws JudgeException {
        boolean is =  expected.trim().equals(actual.trim());
        if(!is){
            throw new JudgeException("Wrong Answer");
        }
    }

    public String judge(String problemId, String code) throws IOException, JudgeException, InterruptedException {
        Optional<Problem> optionalProblem =  this.problemRepo.findById(problemId);
        Problem problem = optionalProblem.orElseThrow(() -> new JudgeException("Problem not found"));

        Path tmpDir = this.createTempJavaFile(code);
        this.compileJava(tmpDir);

        List<TestCase> testCases = this.testCaseRepo.findAllByProblemId(problem.getId());

        for(TestCase testCase : testCases){
            if(testCase.getTestType().equals("match")){
                String output = this.runJava(tmpDir, testCase.getInputText(), problem.getTimeLimit(), problem.getTimeout());
                this.matchResult(testCase.getOutputText(), output);
            }
            else{
                throw new JudgeException("unknown");
            }

        }

        return "Accepted";
    }
}
