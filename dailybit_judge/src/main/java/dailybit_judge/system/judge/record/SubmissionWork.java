package dailybit_judge.system.judge.record;

import java.util.List;

import dailybit_judge.system.judge.dtos.TestCaseDTO;
import dailybit_judge.system.judge.models.Submission;

public record SubmissionWork(Submission submission, List<TestCaseDTO> testCases){}
