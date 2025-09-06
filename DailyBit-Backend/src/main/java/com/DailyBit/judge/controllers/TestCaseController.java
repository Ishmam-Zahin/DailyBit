package com.DailyBit.judge.controllers;


import com.DailyBit.judge.models.TestCase;
import com.DailyBit.judge.services.TestCaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TestCaseController {

    private final TestCaseService testCaseService;

    @Autowired
    public TestCaseController(TestCaseService testCaseService) {
        this.testCaseService = testCaseService;
    }

    @GetMapping("/test-cases")
    public List<TestCase> getAllTestCases(){
        return testCaseService.findAllTestCases();
    }

    @PostMapping("/test-cases")
    public TestCase createTestCase(@RequestBody TestCase testCase){
        return testCaseService.addTestCase(testCase);
    }

    @PostMapping("/{problemId}/test-cases")
    public List<TestCase> getTestCasesOfProblem(@PathVariable String problemId){
        return testCaseService.getAllTestCasesByProblemId(problemId);
    }

    @GetMapping("/test-case/{id}")
    public ResponseEntity<?> getTestCase(@PathVariable int id){
        try {
            TestCase testCase = testCaseService.getTestCaseById(id);
            return ResponseEntity.ok(testCase);
        }
        catch (Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PostMapping("/test-case")
    public TestCase updateTestCase(@RequestBody TestCase testCase){
        return testCaseService.updateTestCase(testCase);
    }

    @DeleteMapping("/test-case/{id}")
    public void deleteTestCase(@PathVariable int id){
        testCaseService.deleteTestCase(id);
    }
}
