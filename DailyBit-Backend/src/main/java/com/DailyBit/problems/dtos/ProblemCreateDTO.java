package com.DailyBit.problems.dtos;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProblemCreateDTO {
    @NotNull
    @NotBlank
    @Size (min = 5, max = 5)
    private String id;

    @Positive 
    private Long courseId;

    @Positive 
    private Long chapterId;

    @NotNull
    @NotBlank
    private String name;

    @NotNull
    @NotBlank
    private String descp;
}
