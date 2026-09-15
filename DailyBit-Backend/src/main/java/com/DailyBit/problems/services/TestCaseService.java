package com.DailyBit.problems.services;

import org.springframework.stereotype.Service;

import com.DailyBit.problems.dtos.TestCaseCreateDTO;
import com.DailyBit.problems.dtos.TestCaseUpdateDTO;
import com.DailyBit.problems.models.Problem;
import com.DailyBit.problems.models.TestCase;
import com.DailyBit.problems.repositories.ProblemRepo;
import com.DailyBit.problems.repositories.TestCaseRepo;

@Service
public class TestCaseService {
    private final TestCaseRepo testCaseRepo;
    private final ProblemRepo problemRepo;

    public TestCaseService(TestCaseRepo testCaseRepo, ProblemRepo problemRepo){
        this.testCaseRepo = testCaseRepo;
        this.problemRepo = problemRepo;
    }

    public TestCase createTestCase(TestCaseCreateDTO testCaseCreateDTO){
        Problem problem = problemRepo.findById(testCaseCreateDTO.getProblemId()).orElseThrow(() -> new RuntimeException("problem not found"));
        TestCase testCase = TestCase.convert(testCaseCreateDTO, problem);

        testCaseRepo.save(testCase);

        return testCase;
    }

    public void deleteTestCase(Long id){
        TestCase testCase = testCaseRepo.findById(id).orElseThrow(() -> new RuntimeException("test case not found"));

        testCaseRepo.delete(testCase);
    }

    public TestCase updateTestCase(Long id, TestCaseUpdateDTO testCaseUpdateDTO){
        TestCase testCase = testCaseRepo.findById(id).orElseThrow(() -> new RuntimeException("test case not found"));

        testCase.update(testCaseUpdateDTO);

        testCase = testCaseRepo.save(testCase);

        return testCase;
    }
}
