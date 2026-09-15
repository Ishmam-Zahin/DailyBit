package com.DailyBit.problems.models;

import com.DailyBit.problems.dtos.TestCaseCreateDTO;
import com.DailyBit.problems.dtos.TestCaseUpdateDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table (name = "test_cases")
@Data
@AllArgsConstructor
@NoArgsConstructor 
public class TestCase {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (nullable = false)
    private Double timeLimit;

    @Column (nullable = false)
    private Integer memoryLimit;

    @Column (nullable = false, columnDefinition = "TEXT")
    private String input;

    @Column (nullable = false, columnDefinition = "TEXT")
    private String output;

    @ManyToOne
    @JoinColumn (name = "problem_id")
    private Problem problem;

    public static TestCase convert(TestCaseCreateDTO testCaseCreateDTO, Problem problem){
        TestCase testCase = new TestCase();
        testCase.setTimeLimit(testCaseCreateDTO.getTimeLimit());
        testCase.setMemoryLimit(testCaseCreateDTO.getMemoryLimit());
        testCase.setInput(testCaseCreateDTO.getInput());
        testCase.setOutput(testCaseCreateDTO.getOutput());
        testCase.setProblem(problem);

        return testCase;
    }

    public void update(TestCaseUpdateDTO testCaseUpdateDTO){
        this.timeLimit = testCaseUpdateDTO.getTimeLimit();
        this.memoryLimit = testCaseUpdateDTO.getMemoryLimit();
        this.input = testCaseUpdateDTO.getInput();
        this.output = testCaseUpdateDTO.getOutput();
    }
}
