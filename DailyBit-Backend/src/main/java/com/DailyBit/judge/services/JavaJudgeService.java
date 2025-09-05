package com.DailyBit.judge.services;

import com.DailyBit.judge.exceptionModel.JudgeException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;


@Service
public class JavaJudgeService {

    private final Path javaBase = Path.of(System.getProperty("user.dir"), "judge", "java");
    private final String javaImageName = "openjdk:26-slim";
    private final String javaFileName = "Solution";


    public JavaJudgeService() throws IOException {

        if(!Files.exists(javaBase)){
            Files.createDirectories(javaBase);
        }
    }

    public ProcessBuilder getCompileProcessBuilder(Path dir){
        ProcessBuilder pb = new ProcessBuilder(
                "docker", "run", "--rm",
                "-v", dir + ":/home", javaImageName,
                "javac", "/home/" + javaFileName + ".java"
        );
        pb.redirectErrorStream(true);

        return  pb;
    }

    public ProcessBuilder getExecuteProcessBuilder(Path dir, int ulimit, int timeout){
        ProcessBuilder pb = new ProcessBuilder(
                "docker", "run", "--rm",
                "-v", dir + ":/home", javaImageName,
                "bash", "-c", "ulimit -t " + ulimit + "; timeout " + timeout + " java -cp /home " + javaFileName
        );
        pb.redirectErrorStream(true);

        return  pb;
    }

    public String executeJava(String code) {
        Path javaBase = this.javaBase;
        Path tmpDir = null;
        String result;
        String cleanUpError = null;

        try{
            tmpDir = Files.createTempDirectory(javaBase, "temp_");
            Path tmpJavaFile = tmpDir.resolve("Solution.java");
            Files.writeString(tmpJavaFile, code);

            ProcessBuilder compilePb = this.getCompileProcessBuilder(tmpDir);
            Process p = compilePb.start();
            String compileError = new String(p.getInputStream().readAllBytes());
            int exitCode = p.waitFor();
            if(exitCode != 0){
                throw new JudgeException(compileError);
            }
            ProcessBuilder runPb = this.getExecuteProcessBuilder(tmpDir, 2, 5);
            Process p2 = runPb.start();
            String output = new String(p2.getInputStream().readAllBytes());
            int exitCode2 = p2.waitFor();
            if(exitCode2 != 0){
                if(exitCode2 == 124 || exitCode2 == 137){
                    output = "Time Limit Exceeded";
                }
                throw new JudgeException(output);
            }

            result = output;
        }
        catch (Exception e){
            result = e.getMessage();
        }
        finally {
            if (tmpDir != null) {
                try (var paths = Files.walk(tmpDir)) {
                    paths.sorted(Comparator.reverseOrder())
                    .forEach(path -> {
                        try {
                            Files.delete(path);
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    });
                }
                catch (Exception e){
                    cleanUpError = e.getMessage();
                    System.out.println("cleanUpError: " + cleanUpError);
                }
            }
        }
        return result;
    }
}
