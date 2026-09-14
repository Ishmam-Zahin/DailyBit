package dailybit_judge.system.judge.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import dailybit_judge.system.judge.dtos.SubmissionRequestDTO;
import dailybit_judge.system.judge.models.Submission;
import dailybit_judge.system.judge.services.JudgeService;
import dailybit_judge.system.judge.services.SubmissionService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController ()
public class JudgeController {

    private final JudgeService judgeService;
    private final SubmissionService submissionService;

    public  JudgeController(JudgeService judgeService, SubmissionService submissionService){
        this.judgeService = judgeService;
        this.submissionService = submissionService;
    }

    @GetMapping (path = "/")
    public ResponseEntity<?> greet(){
        return ResponseEntity.ok("server running");
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submit(@Valid @RequestBody SubmissionRequestDTO submissionDto) {
        try{
            Submission submission = judgeService.addWork(submissionDto);

            return ResponseEntity.ok(submission);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("internal server error");
        }
    }

    @GetMapping (path = "/submission/{id}")
    public ResponseEntity<?> getSubmission(@PathVariable Long id){
        try{
            Submission submission = submissionService.getSubmission(id);
            return ResponseEntity.ok(submission);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("server error");
        }
    }
    
}
