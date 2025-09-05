package com.DailyBit.judge.Repository;


import com.DailyBit.judge.models.TestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestCaseRepo extends JpaRepository<TestCase, Integer> {

    List<TestCase> findAllByProblemId(String problemId);
}
