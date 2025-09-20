package com.DailyBit.judge.Repositories;


import com.DailyBit.judge.models.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmissionRepo extends JpaRepository<Submission, Long> {
    List<Submission> findAllByProblemId(String problemId);
}
