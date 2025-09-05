package com.DailyBit.judge.controllers;


import com.DailyBit.judge.services.JavaJudgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class JudgeController {

    private final JavaJudgeService javaJudgeService;

    public JudgeController(JavaJudgeService javaJudgeService) {
        this.javaJudgeService = javaJudgeService;
    }

    @PostMapping("/judge/problem")
    public String judgeProblem(@RequestBody Map<String, String> payload){
        String code = payload.get("code");

        return javaJudgeService.executeJava(code);
    }
}
