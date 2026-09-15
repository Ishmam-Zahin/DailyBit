package com.DailyBit.problems.dtos;

import java.util.List;

import com.DailyBit.problems.models.Problem;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProblemDTO {
    @Positive 
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

    private List<TestCaseDTO> testCases;

    public static ProblemDTO convert(Problem problem){
        ProblemDTO problemDTO = new ProblemDTO();
        problemDTO.setId(problem.getId());
        problemDTO.setCourseId(problem.getCourse().getId());
        problemDTO.setChapterId(problem.getChapter().getId());
        problemDTO.setName(problem.getName());
        problemDTO.setDescp(problem.getDescp());
        problemDTO.setTestCases(
            problem.getTestCases().stream().map((testCase) -> TestCaseDTO.covert(testCase)).toList()
        );

        return problemDTO;
    }
}
