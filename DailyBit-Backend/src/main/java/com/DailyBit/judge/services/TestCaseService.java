package com.DailyBit.judge.services;


import java.io.FileNotFoundException;
import java.util.List;
import java.util.Optional;

import com.DailyBit.exceptionModel.CustomException;
import com.DailyBit.judge.DTOs.RequestTestCaseDTO;
import com.DailyBit.judge.DTOs.ResponseTestCaseDTO;
import com.DailyBit.judge.Repository.ProblemRepo;
import com.DailyBit.judge.models.Problem;
import com.DailyBit.judge.others.TestType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import com.DailyBit.judge.Repository.TestCaseRepo;
import com.DailyBit.judge.models.TestCase;

@Service
public class TestCaseService {
    private final TestCaseRepo testCaseRepo;
    private final ProblemRepo problemRepo;

    @Autowired
    public TestCaseService(TestCaseRepo testCaseRepo, ProblemRepo problemRepo) {
        this.testCaseRepo = testCaseRepo;
        this.problemRepo = problemRepo;
    }

    private TestCase convertToTestCase(RequestTestCaseDTO requestTestCaseDTO) throws FileNotFoundException {
        Problem problem = problemRepo.findById(requestTestCaseDTO.getProblemId()).orElseThrow(() -> new FileNotFoundException("problem not found"));
        TestCase testCase = new TestCase();
        testCase.setId(requestTestCaseDTO.getId());
        testCase.setProblem(problem);
        testCase.setTestType(requestTestCaseDTO.getTestType());
        testCase.setInput(requestTestCaseDTO.getInput());
        testCase.setOutput(requestTestCaseDTO.getOutput());

        return testCase;
    }

    private ResponseTestCaseDTO  convertToDTO(TestCase testCase){
        ResponseTestCaseDTO responseTestCaseDTO = new ResponseTestCaseDTO();
        responseTestCaseDTO.setId(testCase.getId());
        responseTestCaseDTO.setTestType(testCase.getTestType());
        responseTestCaseDTO.setInput(testCase.getInput());
        responseTestCaseDTO.setOutput(testCase.getOutput());
        responseTestCaseDTO.setProblem(testCase.getProblem());

        return responseTestCaseDTO;
    }

    public List<ResponseTestCaseDTO> getAllTestCases(String problemId, TestType testType) {
        List<TestCase> testCases = testCaseRepo.filterTestCases(problemId, testType);
        return testCases.stream().map(this::convertToDTO).toList();
    }

    public void addTestCase(RequestTestCaseDTO requestTestCaseDTO) throws FileNotFoundException, CustomException {
        if(requestTestCaseDTO.getId() == null){
            TestCase newTestCase = this.convertToTestCase(requestTestCaseDTO);
            testCaseRepo.save(newTestCase);
        }
        else{
            throw new CustomException("new test case can not have ID field value");
        }
    }

    public ResponseTestCaseDTO getTestCaseById(int id) throws FileNotFoundException {
        TestCase testCase = testCaseRepo.findById(id).orElseThrow(() -> new FileNotFoundException("test case not found"));
        return this.convertToDTO(testCase);
    }

    public void updateTestCase(RequestTestCaseDTO requestTestCaseDTO) throws FileNotFoundException {
        testCaseRepo.findById(requestTestCaseDTO.getId()).orElseThrow(() -> new FileNotFoundException("Test case not found!"));
        TestCase newTestCase = this.convertToTestCase(requestTestCaseDTO);
        testCaseRepo.save(newTestCase);
    }

    public void deleteTestCase(int id) throws FileNotFoundException {
        if(testCaseRepo.existsById(id)){
            testCaseRepo.deleteById(id);
        }
        else{
            throw new FileNotFoundException("test case not found");
        }
    }
}
