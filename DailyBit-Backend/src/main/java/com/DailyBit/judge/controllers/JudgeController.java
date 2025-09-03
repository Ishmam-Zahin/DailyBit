package com.DailyBit.judge.controllers;


import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class JudgeController {

    @PostMapping("/judge/problem")
    public String judgeProblem(@RequestBody Map<String, String> payload){
        System.out.println(payload);
        try{
            String code = payload.get("code");
            Path tmpFile = Files.createTempFile("test", ".py");
            Files.writeString(tmpFile, code);

            ProcessBuilder pb = new ProcessBuilder(
                    "docker", "run", "--rm",
                    "-v", tmpFile.toAbsolutePath()+":/home/test.py", "python:3.13-slim",
                    "python", "/home/test.py"
            );
            pb.redirectErrorStream(true);

            Process p = pb.start();
            String output = new String(p.getInputStream().readAllBytes());
            int exitCode = p.waitFor();


            return output;
        }
        catch (Exception e){
            return  "error" + e.getMessage();
        }
    }
}
