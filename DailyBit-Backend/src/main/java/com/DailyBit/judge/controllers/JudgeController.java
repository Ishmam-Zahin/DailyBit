package com.DailyBit.judge.controllers;


import com.DailyBit.judge.DTOs.SubmissionDTO;
import com.DailyBit.judge.services.JavaJudgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class JudgeController {

    private final JavaJudgeService javaJudgeService;

    @Autowired
    public JudgeController(JavaJudgeService javaJudgeService) {
        this.javaJudgeService = javaJudgeService;
    }

    @PostMapping("/judge/problem")
    public ResponseEntity<?> judgeProblem(@RequestBody SubmissionDTO submissionDTO){
        Map<String, Object> message = new HashMap<>();

        try {
            if(submissionDTO.getLanguage().equals("java")){
                String output = javaJudgeService.judge(submissionDTO.getProblemId(), submissionDTO.getCode());
                message.put("output", output);
                return ResponseEntity.ok(message);
            }
            else{
                message.put("message", "unknown language");
                return ResponseEntity.badRequest().body(message);
            }
        }
        catch (Exception e) {
            message.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(message);
        }
    }
}
