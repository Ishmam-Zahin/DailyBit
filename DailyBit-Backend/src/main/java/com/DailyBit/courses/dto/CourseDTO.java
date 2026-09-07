package com.DailyBit.courses.dto;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.DailyBit.courses.models.Course;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter 
@Getter 
@NoArgsConstructor
@AllArgsConstructor 
public class CourseDTO {
    @Positive 
    @NotNull
    private Long id;

    @NotNull
    @NotEmpty 
    @NotBlank
    @Length (min = 1, max = 100)
    private String name;

    private List<ChapterSummaryDTO> chapters;

    public CourseDTO(Course course){
        this.id = course.getId();
        this.name = course.getName();
        this.chapters = course.getChapters().stream().map(ChapterSummaryDTO::new).toList();
    }
}
