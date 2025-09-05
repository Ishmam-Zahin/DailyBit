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
                "docker", "run", "--rm",
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

    public boolean compileJava(Path tmpDir) throws IOException, InterruptedException {
        boolean compiled = true;
        ProcessBuilder compilePb = this.getCompileProcessBuilder(tmpDir);
        Process p = compilePb.start();
        int exitCode = p.waitFor();
        if(exitCode != 0){
            compiled = false;
        }

        return compiled;
    }

    public String runJava(Path tmpDir) throws IOException, InterruptedException {
        String result;

        ProcessBuilder runPb = this.getExecuteProcessBuilder(tmpDir, 2, 5);
        Process p = runPb.start();
        result = new String(p.getInputStream().readAllBytes());
        int exitCode = p.waitFor();

        return result;
    }
}
