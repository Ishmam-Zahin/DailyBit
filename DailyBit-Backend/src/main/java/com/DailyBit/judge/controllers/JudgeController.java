package com.DailyBit.judge.controllers;


import com.DailyBit.judge.DTOs.SubmissionDTO;
import com.DailyBit.judge.services.JavaJudgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class JudgeController {

    private final JavaJudgeService javaJudgeService;

    @Autowired
    public JudgeController(JavaJudgeService javaJudgeService) {
        this.javaJudgeService = javaJudgeService;
    }

    @PostMapping("/judge/problem")
    public String judgeProblem(@RequestBody SubmissionDTO submissionDTO){

        try {
            if(submissionDTO.getLanguage().equals("java")){
                return javaJudgeService.judge(submissionDTO.getProblemId(), submissionDTO.getCode());
            }
            else{
                return "Unknown Language";
            }
        }
        catch (Exception e) {
            return e.getMessage();
        }
    }
}
