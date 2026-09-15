package com.DailyBit.problems.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor 
public class ChapterSummaryDTO {
    @Positive 
    private Long Id;

    @NotNull
    @NotBlank
    private String name;
}
