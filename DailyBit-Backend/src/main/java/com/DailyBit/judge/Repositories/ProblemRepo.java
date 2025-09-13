package com.DailyBit.judge.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.DailyBit.judge.models.Problem;

@Repository
public interface ProblemRepo extends JpaRepository<Problem, String> {
    @Query(
            """
            select p from Problem p
            where (:name = '' or lower(p.name) like lower(concat('%', :name, '%') ))
                  and (:sectionName = 'all' or p.section.name = :sectionName)
                  and (:chapterNo = -1 or p.chapterNo = :chapterNo)
            """
    )
    List<Problem> filterProblems(
            @Param("name") String name,
            @Param("sectionName") String sectionName,
            @Param("chapterNo") int chapterNo
    );
}
