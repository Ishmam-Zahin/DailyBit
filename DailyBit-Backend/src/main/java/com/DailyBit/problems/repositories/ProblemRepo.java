package com.DailyBit.problems.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.DailyBit.problems.models.Problem;

@Repository
public interface ProblemRepo extends JpaRepository<Problem, String>{
    List<Problem> findAllByCourseId(Long id);
    
    List<Problem> findAllByChapterId(Long id);

    List<Problem> findAllByCourseIdAndChapterId(Long courseId, Long chapterId);
}
