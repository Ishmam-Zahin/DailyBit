package com.DailyBit.problems.dtos;

import com.DailyBit.problems.models.TestCase;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor 
@AllArgsConstructor 
public class TestCaseDTO {
    @Positive 
    private Long id;

    @PositiveOrZero
    private Double timeLimit;

    @Positive
    private Integer memoryLimit;

    @NotNull 
    @NotBlank
    private String input;

    @NotNull
    @NotBlank
    private String output;

    public static TestCaseDTO covert(TestCase testCase){
        TestCaseDTO testCaseDTO = new TestCaseDTO();
        testCaseDTO.setId(testCase.getId());
        testCaseDTO.setTimeLimit(testCase.getTimeLimit());
        testCaseDTO.setMemoryLimit(testCase.getMemoryLimit());
        testCaseDTO.setInput(testCase.getInput());
        testCaseDTO.setOutput(testCase.getOutput());

        return testCaseDTO;
    }
}
