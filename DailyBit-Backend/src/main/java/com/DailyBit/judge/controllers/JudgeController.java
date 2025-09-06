package com.DailyBit.judge.controllers;


import com.DailyBit.judge.models.Submission;
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
    public String judgeProblem(@RequestBody Submission submission){

        try {
            if(submission.getLanguage().equals("java")){
                return javaJudgeService.judge(submission.getProblemId(), submission.getCode());
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
