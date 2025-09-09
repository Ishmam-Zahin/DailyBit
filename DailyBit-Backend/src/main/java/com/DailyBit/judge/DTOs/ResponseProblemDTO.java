package com.DailyBit.judge.DTOs;


import com.DailyBit.judge.models.Section;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    private String defaultTemplate;
}
