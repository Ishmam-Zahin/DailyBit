package com.DailyBit.judge.DTOs;


import com.DailyBit.judge.models.Problem;
import com.DailyBit.judge.others.TestType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseTestCaseDTO {

    private Integer id;

    private Problem problem;

    private TestType testType = TestType.EXACT;

    private String input;

    private String output;
}
