package com.DailyBit.judge.services;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

import com.DailyBit.auth.models.MyUserDetails;
import com.DailyBit.judge.models.Submission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DailyBit.judge.Repositories.ProblemRepo;
import com.DailyBit.exceptionModel.CustomException;
import com.DailyBit.judge.models.Problem;
import com.DailyBit.judge.models.TestCase;
import com.DailyBit.judge.others.TestType;


@Service
public class JavaJudgeService {

    private final ProblemRepo problemRepo;
    private final SubmissionService submissionService;

    private final Path javaBase = Path.of(System.getProperty("user.dir"), "judge", "java");
    private final String javaFileName = "Solution";

    @Autowired
    public JavaJudgeService(ProblemRepo problemRepo, SubmissionService submissionService) throws IOException {
        this.problemRepo = problemRepo;
        this.submissionService = submissionService;

        if(!Files.exists(javaBase)){
            Files.createDirectories(javaBase);
        }
    }

    private ProcessBuilder getExecuteProcessBuilder(Path dir, int uLimit, int timeout){
        final String javaImageName = "java-runner:latest";
        ProcessBuilder pb = new ProcessBuilder(
                "docker", "run", "--rm",
                "--memory=256m", "--cpus=1",
                "-v", dir + ":/java/code", javaImageName,
                "bash", "-c",
                "cd /java/code && timeout " + timeout + " javac " + javaFileName + ".java && ulimit -t " + uLimit + " && java " + javaFileName + " < input.txt"
        );
        pb.redirectErrorStream(true);

        return  pb;
    }

    private Path createTempJavaFile(String code, String userName) throws IOException {
        Path tmpDir = Files.createTempDirectory(this.javaBase, userName + "_temp_");
        Path codeFileDir = tmpDir.resolve("code");
        Files.createDirectories(codeFileDir);
        Path codeFile = codeFileDir.resolve(this.javaFileName + ".java");
        Path inputFile = codeFileDir.resolve("input.txt");
        Files.writeString(codeFile, code);
        Files.writeString(inputFile, "");

        return codeFileDir;
    }

    private String runJava(Path codeFileDir, String input, int uLimit, int timeout) throws IOException, InterruptedException, CustomException {
        String result;
        Path inputFile = codeFileDir.resolve("input.txt");
        Files.writeString(inputFile, input);

        ProcessBuilder runPb = this.getExecuteProcessBuilder(codeFileDir, uLimit, timeout);
        Process p = runPb.start();
        result = new String(p.getInputStream().readAllBytes());
        int exitCode = p.waitFor();

        if(exitCode != 0){
            if(exitCode == 137 || exitCode == 124){
                throw new CustomException("Runtime Error: Time Limit Exceeded");
            }
            throw new CustomException("Runtime Error: " + result);
        }

        return result;
    }

    private void matchResult(String expected, String actual) throws CustomException {
        boolean is =  expected.trim().equals(actual.trim());
        if(!is){
            throw new CustomException("Wrong Answer");
        }
    }

    public String judge(String problemId, String code, MyUserDetails myUserDetails) throws IOException, CustomException, InterruptedException {

        Path codeFileDir = this.createTempJavaFile(code, myUserDetails.getUsername());

        if(problemId.equals("none")){
            return this.runJava(codeFileDir, "", 2, 5);
        }

        Optional<Problem> optionalProblem =  this.problemRepo.findById(problemId);
        Problem problem = optionalProblem.orElseThrow(() -> new CustomException("Problem not found"));

        List<TestCase> testCases = problem.getTestCases();

        Submission submission = new Submission();
        submission.setCode(code);
        submission.setProblem(problem);
        submission.setUser(myUserDetails.getUser());

        for(TestCase testCase : testCases){
            if(testCase.getTestType() == TestType.EXACT){
                try {
                    String output = this.runJava(codeFileDir, testCase.getInput(), problem.getTimeLimit(), problem.getTimeout());
                    this.matchResult(testCase.getOutput(), output);
                }
                catch (CustomException e){
                    submission.setResult(e.getMessage());
                    submissionService.addSubmission(submission);
                    throw e;
                }
            }
            else{
                throw new CustomException("unknown");
            }

        }
        submission.setResult("Accepted");
        submissionService.addSubmission(submission);

        return "Accepted";
    }
}
