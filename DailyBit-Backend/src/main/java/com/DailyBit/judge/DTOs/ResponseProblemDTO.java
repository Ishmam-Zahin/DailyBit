package com.DailyBit.judge.DTOs;


import com.DailyBit.judge.models.Section;
import com.DailyBit.judge.models.TestCase;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseProblemDTO {

    private String id;

    private String name;

    private Section section;

    private int chapterNo;

    private int timeLimit;

    private int timeout;

    private List<TestCase> testCases;

}
