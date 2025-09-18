package com.DailyBit.judge.Repositories;


import com.DailyBit.judge.models.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubmissionRepo extends JpaRepository<Submission, Long> {
}
