package dailybit_judge.system.judge.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import dailybit_judge.system.judge.enums.Language;
import dailybit_judge.system.judge.enums.SubmissionStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table (name = "submissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Submission {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "problem_id", nullable = true)
    private Long problemId;

    @Column (name = "user_id", nullable = false)
    private Long userId;

    @Column (nullable = false)
    @Enumerated (EnumType.STRING)
    private Language language;

    @Column (nullable = false)
    private String code;

    @Column (nullable = false, updatable = false)
    @CreationTimestamp 
    private LocalDateTime createdAt;

    @Column (nullable = false)
    @Enumerated (EnumType.STRING)
    private SubmissionStatus status = SubmissionStatus.QUEUED;

    @Column (nullable = true)
    private String descp = null;
}
