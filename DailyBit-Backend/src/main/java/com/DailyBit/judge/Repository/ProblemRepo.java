package com.DailyBit.judge.Repository;

import com.DailyBit.judge.models.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemRepo extends JpaRepository<Problem, String> {
}
