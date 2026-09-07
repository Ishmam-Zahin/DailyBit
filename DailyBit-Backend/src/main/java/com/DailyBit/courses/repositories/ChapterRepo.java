package com.DailyBit.courses.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.DailyBit.courses.models.Chapter;

@Repository 
public interface ChapterRepo extends JpaRepository<Chapter, Long> {
    
}
