package com.DailyBit.courses.services;

import org.springframework.stereotype.Service;

import com.DailyBit.courses.dto.ChapterCreateDTO;
import com.DailyBit.courses.dto.ChapterDTO;
import com.DailyBit.courses.models.Chapter;
import com.DailyBit.courses.models.Course;
import com.DailyBit.courses.repositories.ChapterRepo;
import com.DailyBit.courses.repositories.CourseRepo;
import com.DailyBit.exceptionModel.CustomException;

@Service 
public class ChapterService {
    private final ChapterRepo chapterRepo;
    private final CourseRepo courseRepo;

    public ChapterService(ChapterRepo chapterRepo, CourseRepo courseRepo){
        this.chapterRepo = chapterRepo;
        this.courseRepo = courseRepo;
    }

    public ChapterDTO createChapter(ChapterCreateDTO dto) throws Exception{
        Course course = courseRepo.findById(dto.getCourseId()).orElseThrow(() -> new CustomException("course with that id not found"));
        Chapter chapter = new Chapter();
        chapter.setName(dto.getName());
        chapter.setCourse(course);
        Chapter chapterSaved = chapterRepo.save(chapter);
        ChapterDTO chapterdto = new ChapterDTO(chapterSaved);

        return chapterdto;
    }

    public void deleteChapter(Long id){
        chapterRepo.deleteById(id);
    }
}
