package com.DailyBit.judge.controllers;

import com.DailyBit.judge.models.Submission;
import com.DailyBit.judge.services.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class SubmissionController {
    private final SubmissionService submissionService;

    @Autowired
    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @GetMapping("/submissions/{problemId}")
    public ResponseEntity<?> getSubmissions(@PathVariable String problemId) {
        Map<String, Object> message = new HashMap<>();
        List<Submission> submissions = submissionService.getAllSubmissions(problemId);

        return ResponseEntity.ok(submissions);
    }
}
