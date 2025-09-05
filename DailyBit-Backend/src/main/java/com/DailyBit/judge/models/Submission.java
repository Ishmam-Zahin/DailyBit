package com.DailyBit.judge.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Submission {
    private String problemId;
    private String language;
    private String code;
}
