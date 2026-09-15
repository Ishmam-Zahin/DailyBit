package com.DailyBit.problems.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DailyBit.problems.dtos.TestCaseCreateDTO;
import com.DailyBit.problems.dtos.TestCaseDTO;
import com.DailyBit.problems.dtos.TestCaseUpdateDTO;
import com.DailyBit.problems.models.TestCase;
import com.DailyBit.problems.services.TestCaseService;

import jakarta.validation.Valid;

@RestController
@RequestMapping (path = "/api")
public class TestCaseController {
    private final TestCaseService testCaseService;

    public TestCaseController(TestCaseService testCaseService){
        this.testCaseService = testCaseService;
    }

    @PostMapping (path = "/test-case")
    public ResponseEntity<?> createTestCase(@Valid @RequestBody TestCaseCreateDTO testCaseCreateDTO){
        try{
            TestCase testCase = testCaseService.createTestCase(testCaseCreateDTO);
            TestCaseDTO testCaseDTO = TestCaseDTO.covert(testCase);

            return ResponseEntity.ok(testCaseDTO);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping (path = "/test-case/{id}")
    public ResponseEntity<?> updateTestCase(@Valid @RequestBody TestCaseUpdateDTO testCaseUpdateDTO, @PathVariable Long id){
        try{
            TestCase testCase = testCaseService.updateTestCase(id, testCaseUpdateDTO);
            TestCaseDTO testCaseDTO = TestCaseDTO.covert(testCase);

            return ResponseEntity.ok(testCaseDTO);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    public ResponseEntity<?> deleteTestCase(@PathVariable Long id){
        try{
            testCaseService.deleteTestCase(id);
            
            return ResponseEntity.ok("deleted");
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
