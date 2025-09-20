package com.DailyBit.judge.controllers;


import com.DailyBit.auth.models.MyUserDetails;
import com.DailyBit.exceptionModel.CustomException;
import com.DailyBit.judge.DTOs.SubmissionDTO;
import com.DailyBit.judge.services.JavaJudgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class JudgeController {

    private final JavaJudgeService javaJudgeService;

    @Autowired
    public JudgeController(JavaJudgeService javaJudgeService) {
        this.javaJudgeService = javaJudgeService;
    }

    @PostMapping("/judge/problem")
    public ResponseEntity<?> judgeProblem(@RequestBody SubmissionDTO submissionDTO, @AuthenticationPrincipal MyUserDetails user) throws IOException, CustomException, InterruptedException {
        Map<String, Object> message = new HashMap<>();

        try {
            if(submissionDTO.getLanguage().equals("java")){
                String output = javaJudgeService.judge(submissionDTO.getProblemId(), submissionDTO.getCode(), user);
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
