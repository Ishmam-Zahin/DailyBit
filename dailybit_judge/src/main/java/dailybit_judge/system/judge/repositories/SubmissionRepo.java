package dailybit_judge.system.judge.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dailybit_judge.system.judge.models.Submission;

@Repository 
public interface SubmissionRepo extends JpaRepository<Submission, Long> {
    List<Submission> findAllByProblemId(Long problemId);

    List<Submission> findAllByProblemIdAndUserId(Long problemId, Long userId);

    List<Submission> findAllByUserId(Long userId);
}
