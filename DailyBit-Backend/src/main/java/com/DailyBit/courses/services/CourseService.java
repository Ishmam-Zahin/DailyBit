package com.DailyBit.courses.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.DailyBit.courses.dto.CourseCreateDTO;
import com.DailyBit.courses.dto.CourseDTO;
import com.DailyBit.courses.models.Course;
import com.DailyBit.courses.repositories.CourseRepo;

@Service 
public class CourseService {
    private final CourseRepo courseRepo;


    public  CourseService(CourseRepo courseRepo){
        this.courseRepo = courseRepo;
    }

    public List<CourseDTO> getAllCourse(){
        List<Course> courses = courseRepo.findAll();

        List<CourseDTO> courseDTOs = courses.stream().map(CourseDTO::new).toList();

        return courseDTOs;
    }

    public CourseDTO createCourse(CourseCreateDTO dto){
        Course course = new Course();
        course.setName(dto.getName());
        Course courseSaved = courseRepo.save(course);
        CourseDTO coursedto = new CourseDTO(courseSaved);

        return coursedto;
    }

    public void deleteCourse(Long id){
        courseRepo.deleteById(id);
    }
}
