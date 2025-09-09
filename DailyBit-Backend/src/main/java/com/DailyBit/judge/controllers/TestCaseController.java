package com.DailyBit.judge.controllers;


import com.DailyBit.judge.DTOs.RequestTestCaseDTO;
import com.DailyBit.judge.DTOs.ResponseTestCaseDTO;
import com.DailyBit.judge.models.TestCase;
import com.DailyBit.judge.others.TestType;
import com.DailyBit.judge.services.TestCaseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class TestCaseController {

    private final TestCaseService testCaseService;

    @Autowired
    public TestCaseController(TestCaseService testCaseService) {
        this.testCaseService = testCaseService;
    }

    @GetMapping("/test-cases")
    public ResponseEntity<?> getAllTestCases(
            @RequestParam(name = "problemId", required = false, defaultValue = "") String problemId,
            @RequestParam(name = "testType", required = false, defaultValue = "all") String testTypeString
    ){
        Map<String, Object> message = new HashMap<>();

        try{
            System.out.println(problemId);
            TestType testType = null;
            if(!testTypeString.equals("all")){
                TestType.valueOf(testTypeString);
            }
            List<ResponseTestCaseDTO> testCases = testCaseService.getAllTestCases(problemId, testType);
            return  ResponseEntity.ok(testCases);
        }
        catch (Exception e){
            message.put("message",e.getMessage());
            return ResponseEntity.badRequest().body(message);
        }
    }

    @PostMapping("/test-cases")
    public ResponseEntity<?> createTestCase(@RequestBody RequestTestCaseDTO requestTestCaseDTO, BindingResult result){
        Map<String, Object> message = new HashMap<>();

        if(result.hasErrors()){
            message.put("message", "invalid form data!");
            return ResponseEntity.badRequest().body(message);
        }

        try{
            testCaseService.addTestCase(requestTestCaseDTO);
            message.put("message","test case added");
            return ResponseEntity.ok(message);
        }
        catch (Exception e){
            message.put("message",e.getMessage());
            return ResponseEntity.badRequest().body(message);
        }
    }

    @GetMapping("/test-case/{id}")
    public ResponseEntity<?> getTestCase(@PathVariable int id){
        try {
            ResponseTestCaseDTO responseTestCaseDTO = testCaseService.getTestCaseById(id);
            return ResponseEntity.ok(responseTestCaseDTO);
        }
        catch (Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PostMapping("/test-case")
    public ResponseEntity<?> updateTestCase(@Valid @RequestBody RequestTestCaseDTO requestTestCaseDTO, BindingResult result){
        Map<String, Object> message = new HashMap<>();

        if(result.hasErrors()){
            message.put("message", "invalid form data!");
            return ResponseEntity.badRequest().body(message);
        }

        try{
            testCaseService.updateTestCase(requestTestCaseDTO);
            message.put("message","test case updated");
            return ResponseEntity.ok(message);
        }
        catch (Exception e){
            message.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(message);
        }
    }

    @DeleteMapping("/test-case/{id}")
    public ResponseEntity<?> deleteTestCase(@PathVariable int id){
        Map<String, Object> message = new HashMap<>();

        try{
            testCaseService.deleteTestCase(id);
            message.put("message","test case deleted");
            return ResponseEntity.ok(message);
        }
        catch (Exception e){
            message.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(message);
        }
    }
}
