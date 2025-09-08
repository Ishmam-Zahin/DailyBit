package com.DailyBit.judge.services;


import java.io.FileNotFoundException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DailyBit.judge.Repository.TestCaseRepo;
import com.DailyBit.judge.models.TestCase;

@Service
public class TestCaseService {
    private final TestCaseRepo testCaseRepo;

    @Autowired
    public TestCaseService(TestCaseRepo testCaseRepo) {
        this.testCaseRepo = testCaseRepo;
    }

    public List<TestCase> findAllTestCases() {
        return testCaseRepo.findAll();
    }

    public TestCase addTestCase(TestCase testCase) {
        return testCaseRepo.save(testCase);
    }

    public List<TestCase> getAllTestCasesByProblemId(String problemId){
        return testCaseRepo.findByProblem_id(problemId);
    }

    public TestCase getTestCaseById(int id) throws FileNotFoundException {
        return testCaseRepo.findById(id).orElseThrow(() -> new FileNotFoundException("test case not found"));
    }

    public TestCase updateTestCase(TestCase testCase) {
        return testCaseRepo.save(testCase);
    }

    public void deleteTestCase(int id) {
        testCaseRepo.deleteById(id);
    }
}
