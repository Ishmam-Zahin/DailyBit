package com.DailyBit.courses.dto;

import org.hibernate.validator.constraints.Length;

import com.DailyBit.courses.models.Chapter;

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
public class ChapterDTO {
    @Positive 
    @NotNull
    private Long id;

    @Positive 
    @NotNull
    private Long course_id;

    @NotNull
    @NotEmpty 
    @NotBlank
    @Length (min = 1, max = 100)
    private String name;

    public ChapterDTO(Chapter chapter){
        this.id = chapter.getId();
        this.name = chapter.getName();
        this.course_id = chapter.getCourse().getId();
    }
}
