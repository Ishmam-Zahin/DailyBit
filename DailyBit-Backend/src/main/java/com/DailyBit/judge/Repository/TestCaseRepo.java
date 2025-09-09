package com.DailyBit.judge.Repository;


import java.util.List;

import com.DailyBit.judge.others.TestType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.DailyBit.judge.models.TestCase;

@Repository
public interface TestCaseRepo extends JpaRepository<TestCase, Integer> {

    @Query(
            """
            select t from TestCase t
            where (:problemId = '' or t.problem.id = :problemId)
                  and (:testType is null or t.testType = :testType)
            """
    )
    List<TestCase> filterTestCases(String problemId, TestType testType);

}
