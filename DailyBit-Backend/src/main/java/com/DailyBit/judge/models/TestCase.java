package com.DailyBit.judge.models;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "test_cases")
public class TestCase {

    @Id
    private int id;
    @Column(name = "problem_id")
    private String problemId;
    @Column(name = "test_type")
    private String testType;
    @Column(name = "input_text")
    private String inputText;
    @Column(name = "output_text")
    private String outputText;
}
