package dailybit_judge.system.judge.services;

import org.springframework.stereotype.Service;

import dailybit_judge.system.judge.models.Submission;
import dailybit_judge.system.judge.repositories.SubmissionRepo;

@Service 
public class SubmissionService {
    private final SubmissionRepo submissionRepo;

    public SubmissionService(SubmissionRepo submissionRepo){
        this.submissionRepo = submissionRepo;
    }

    public Submission getSubmission(Long id){
        return submissionRepo.findById(id).orElseThrow(() -> new RuntimeException("id not found"));
    }

    public Submission saveSubmission(Submission submission){
        Submission savedSubmission = submissionRepo.save(submission);

        return savedSubmission;
    }
}
