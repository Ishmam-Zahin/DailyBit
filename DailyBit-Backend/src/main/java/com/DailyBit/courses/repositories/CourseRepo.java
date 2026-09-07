package com.DailyBit.courses.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.DailyBit.courses.models.Course;

@Repository 
public interface CourseRepo extends JpaRepository<Course, Long> {
    
}