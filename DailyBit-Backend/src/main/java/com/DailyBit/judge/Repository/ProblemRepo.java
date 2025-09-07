package com.DailyBit.judge.Repository;

import com.DailyBit.judge.models.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProblemRepo extends JpaRepository<Problem, String> {
    @Query(
            """
            select p from Problem p
            where (:name = '' or lower(p.problemName) like lower(concat('%', :name, '%') ))
                  and (:language = 'all' OR p.language = :language)
                  and (:sectionName = '' OR p.sectionName = :sectionName)
                  and (:chapter = -1 OR p.chapterId = :chapter)
            """
    )
    List<Problem> filterProblems(
            @Param("name") String name,
            @Param("language") String language,
            @Param("sectionName") String sectionName,
            @Param("chapter") int chapter
    );
}
