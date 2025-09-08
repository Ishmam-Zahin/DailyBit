package com.DailyBit.judge.DTOs;


import com.DailyBit.judge.models.Problem;
import com.DailyBit.judge.others.TestType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestTestCaseDTO {
    private Integer id;
    private String problemId;
    private TestType testType = TestType.EXACT;
    private String input;
    private String output;
}
