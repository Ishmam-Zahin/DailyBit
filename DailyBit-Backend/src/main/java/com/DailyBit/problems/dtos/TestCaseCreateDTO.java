package com.DailyBit.problems.dtos;

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
public class TestCaseCreateDTO {
    @Positive
    private String problemId;

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
}
