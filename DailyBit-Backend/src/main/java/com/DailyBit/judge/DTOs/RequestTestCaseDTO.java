package com.DailyBit.judge.DTOs;


import com.DailyBit.judge.others.TestType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestTestCaseDTO {

    private Integer id;

    @NotNull(message = "ProblemID cannot be null")
    @NotBlank(message = "ProblemID cannot be blank")
    @Size(min = 1, max = 10, message = "ProblemID must be between 1 and 10 characters")
    @Pattern(regexp = "^[A-Z0-9]+$", message = "ProblemID must contain only uppercase letters and digits")
    private String problemId;

    @NotNull(message = "Test type cannot be null")
    private TestType testType = TestType.EXACT;

    @NotNull(message = "Input cannot be null")
    private String input = "";

    @NotNull(message = "Output cannot be null")
    private String output = "";
}
