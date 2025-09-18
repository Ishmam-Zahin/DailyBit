package com.DailyBit.judge.services;


import com.DailyBit.judge.Repositories.SubmissionRepo;
import com.DailyBit.judge.models.Submission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubmissionService {

    private final SubmissionRepo submissionRepo;

    @Autowired
    public SubmissionService(SubmissionRepo submissionRepo) {
        this.submissionRepo = submissionRepo;
    }

    public void addSubmission(Submission submission) {
        submissionRepo.save(submission);
    }
}
