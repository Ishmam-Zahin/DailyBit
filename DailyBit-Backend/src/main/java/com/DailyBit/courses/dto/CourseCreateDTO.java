package com.DailyBit.courses.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter 
@Getter 
@NoArgsConstructor 
public class CourseCreateDTO {
    @NotNull
    @NotEmpty 
    @NotBlank
    @Length (min = 1, max = 100)
    private String name;
}
