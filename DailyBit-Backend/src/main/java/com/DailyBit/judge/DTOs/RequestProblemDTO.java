package com.DailyBit.judge.DTOs;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestProblemDTO {

    @NotNull(message = "ID cannot be null")
    @NotBlank(message = "ID cannot be blank")
    @Size(min = 1, max = 10, message = "ID must be between 1 and 10 characters")
    @Pattern(regexp = "^[A-Z0-9]+$", message = "ID must contain only uppercase letters and digits")
    private String id;

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 5, max = 100, message = "Name must be between 5 and 100 characters")
    @Pattern(regexp = "^[a-zA-Z0-9 ]+$", message = "Name must contain only letters and digits")
    private String name;

    @NotNull(message = "Section name cannot be null")
    @NotBlank(message = "Section name cannot be blank")
    @Size(min = 3, max = 50, message = "Section name must be between 3 and 50 characters")
    private String sectionName;

    @NotNull(message = "Chapter no cannot be null")
    @Min(value = 1, message = "Minimum value for chapter no is 1")
    @Max(value = 500, message = "Maximum value for chapter no is 500")
    private Integer chapterNo;

    @Min(value = 1, message = "Minimum value for time limit is 1")
    @Max(value = 5, message = "Maximum value for time is 5")
    private Integer timeLimit = 2;

    @Min(value = 1, message = "Minimum value for time out is 1")
    @Max(value = 10, message = "Maximum value for time out is 10")
    private Integer timeout = 5;

    @NotNull(message = "Template cannot be null")
    @NotBlank(message = "Template cannot be blank")
    private String defaultTemplate;

    private List<RequestTestCaseDTO> requestTestCases;
}
