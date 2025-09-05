package com.DailyBit.judge.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "problems")
public class Problem {
    @Id
    private String id;
    @Column(name = "section_name")
    private String sectionName;
    @Column(name = "chapter_id")
    private int chapterId;
    @Column(name = "problem_name")
    private String problemName;
    @Column(name = "time_limit")
    private int timeLimit;
    private int timeout;
}
