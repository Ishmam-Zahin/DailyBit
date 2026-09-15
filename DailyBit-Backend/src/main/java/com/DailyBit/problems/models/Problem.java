package com.DailyBit.problems.models;

import java.util.ArrayList;
import java.util.List;

import com.DailyBit.courses.models.Chapter;
import com.DailyBit.courses.models.Course;
import com.DailyBit.problems.dtos.ProblemCreateDTO;
import com.DailyBit.problems.dtos.ProblemUpdateDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table (name = "problems")
@Data
@NoArgsConstructor
@AllArgsConstructor 
public class Problem {
    @Id
    private String id;

    @ManyToOne 
    @JoinColumn (name = "course_id")
    private Course course;

    @ManyToOne
    @JoinColumn (name = "chapter_id")
    private Chapter chapter;

    @Column (nullable = false)
    private String name;

    @Column (nullable = false, columnDefinition = "TEXT")
    private String descp;

    @OneToMany (mappedBy = "problem", cascade = CascadeType.ALL)
    private List<TestCase> testCases = new ArrayList<>();

    public void update(ProblemUpdateDTO problemUpdateDTO, Course course, Chapter chapter){
        this.course = course;
        this.chapter = chapter;
        this.name = problemUpdateDTO.getName();
        this.descp = problemUpdateDTO.getDescp();
    }

    public static Problem convert(ProblemCreateDTO problemCreateDTO, Course course, Chapter chapter){
        Problem problem = new Problem();
        problem.setId(problemCreateDTO.getId());
        problem.setCourse(course);
        problem.setChapter(chapter);
        problem.setName(problemCreateDTO.getName());
        problem.setDescp(problemCreateDTO.getDescp());

        return problem;
    }
}
