package dailybit_judge.system.judge.services;

import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;

import org.springframework.stereotype.Service;

import dailybit_judge.system.judge.dtos.SubmissionRequestDTO;
import dailybit_judge.system.judge.dtos.TestCaseDTO;
import dailybit_judge.system.judge.enums.Language;
import dailybit_judge.system.judge.enums.SubmissionStatus;
import dailybit_judge.system.judge.models.Submission;
import dailybit_judge.system.judge.record.SubmissionWork;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

@Service 
public class JudgeService {
    private final static int workersCount = 10;
    private final BlockingQueue<SubmissionWork> works = new LinkedBlockingQueue<>();
    private ExecutorService workers;
    private final JavaRunService javaRunService;
    private final SubmissionService submissionService;

    public JudgeService(JavaRunService javaRunService, SubmissionService submissionService){
        this.javaRunService = javaRunService;
        this.submissionService = submissionService;
    }

    public Submission addWork(SubmissionRequestDTO submissionRequestDTO){
        Submission submission = submissionRequestDTO.getSubmission();
        List<TestCaseDTO> testCases = submissionRequestDTO.getTestCases();
        SubmissionWork submissionWork = new SubmissionWork(submission, testCases);

        submission.setStatus(SubmissionStatus.QUEUED);
        submission = submissionService.saveSubmission(submission);
        try{
            this.works.put(submissionWork);
            return submission;
        }
        catch(InterruptedException e){
            submission.setStatus(SubmissionStatus.SERVER_ERROR);
            submission.setDescp("fail to add to the queue. error: " + e.getMessage());
            submissionService.saveSubmission(submission);
            Thread.currentThread().interrupt();
            return submission;
        }
    }
    
    @PostConstruct
    private void startWorkers(){
        this.workers = Executors.newFixedThreadPool(workersCount);
        for(int i = 0; i < workersCount; i++){
            this.workers.submit(() -> workerLoop());
        }
    }

    private void workerLoop(){
        while(!Thread.currentThread().isInterrupted()){
            try{
                SubmissionWork submissionWork = this.works.take();
                process(submissionWork);
            }
            catch(InterruptedException e){
                Thread.currentThread().interrupt();
                break;
            }
        }
    }

    private void process(SubmissionWork submissionWork) {
        Submission submission = submissionWork.submission();
        List<TestCaseDTO> testCases = submissionWork.testCases();

        if(submission.getLanguage() == Language.JAVA){
            javaRunService.process(submission, testCases);
            submissionService.saveSubmission(submission);
        }
        else{
            submission.setStatus(SubmissionStatus.SERVER_ERROR);
            submission.setDescp("Unknown language");
            submissionService.saveSubmission(submission);
        }
    }


    @PreDestroy
    private void stopWorkers() {
        workers.shutdownNow();
    }
}
