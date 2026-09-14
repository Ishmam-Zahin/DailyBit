package dailybit_judge.system.judge.dtos;

import java.util.List;

import dailybit_judge.system.judge.enums.Language;
import dailybit_judge.system.judge.models.Submission;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor 
@AllArgsConstructor
@Data 
public class SubmissionRequestDTO {
    @Positive
    private Long problemId = null;

    @Positive
    private Long userId;

    private Language language;

    @NotBlank
    @NotNull
    @Size (min = 5)
    private String code;

    private List<TestCaseDTO> testCases;

    public Submission getSubmission(){
        Submission submission = new Submission();
        submission.setProblemId(this.problemId);
        submission.setUserId(this.userId);
        submission.setLanguage(this.language);
        submission.setCode(this.code);

        return submission;
    }
}
