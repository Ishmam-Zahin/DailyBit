package com.DailyBit.courses.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter 
@Getter 
@NoArgsConstructor 
public class ChapterCreateDTO {
    @Positive 
    @NotNull 
    private Long courseId;

    @NotNull
    @NotEmpty 
    @NotBlank
    @Length (min = 1, max = 100)
    private String name;
}
