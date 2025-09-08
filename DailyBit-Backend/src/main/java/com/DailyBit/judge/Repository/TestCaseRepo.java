package com.DailyBit.judge.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.DailyBit.judge.models.TestCase;

@Repository
public interface TestCaseRepo extends JpaRepository<TestCase, Integer> {

    List<TestCase> findByProblem_id(String problemId);
}
