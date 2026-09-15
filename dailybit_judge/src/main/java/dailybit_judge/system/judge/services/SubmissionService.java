package dailybit_judge.system.judge.services;

import java.util.List;

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

    public List<Submission> getSubmissionsByProblemId(Long id){
        return submissionRepo.findAllByProblemId(id);
    }

    public List<Submission> getSubmissionsByUserId(Long id){
        return submissionRepo.findAllByUserId(id);
    }

    public List<Submission> getSubmissionsByProblemIdAndUserId(Long problemdId, Long userId){
        return submissionRepo.findAllByProblemIdAndUserId(problemdId, userId);
    }

    public List<Submission> getSubmissionsAll(){
        return submissionRepo.findAll();
    }
}
