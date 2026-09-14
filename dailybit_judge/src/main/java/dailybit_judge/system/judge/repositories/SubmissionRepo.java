package dailybit_judge.system.judge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dailybit_judge.system.judge.models.Submission;

@Repository 
public interface SubmissionRepo extends JpaRepository<Submission, Long> {
    
}
