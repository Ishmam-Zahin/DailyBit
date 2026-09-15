package com.DailyBit.problems.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.DailyBit.problems.dtos.ProblemCreateDTO;
import com.DailyBit.problems.dtos.ProblemDTO;
import com.DailyBit.problems.dtos.ProblemUpdateDTO;
import com.DailyBit.problems.models.Problem;
import com.DailyBit.problems.services.ProblemService;

import jakarta.validation.Valid;

@RestController
@RequestMapping (path = "/api")
public class ProblemController {
    private final ProblemService problemService;

    public ProblemController(ProblemService problemService){
        this.problemService = problemService;
    }

    @GetMapping (path = "/problem")
    public ResponseEntity<?> getProblems(@RequestParam (required = false) Long courseId, @RequestParam (required = false) Long chapterId){
        List<Problem> problems = new ArrayList<>();
        
        try{
            if(courseId != null && chapterId != null){
            problems = problemService.getProblemByBoth(courseId, chapterId);
            }
            else if(courseId != null && chapterId == null){
                problems = problemService.getProblemByCourseId(courseId);
            }
            else if(courseId == null && chapterId != null){
                problems = problemService.getProblemByChapterId(chapterId);
            }
            else{
                problems = problemService.gettAllProblems();
            }

            List<ProblemDTO> problemDTOs = problems.stream().map((problem) -> ProblemDTO.convert(problem)).toList();

            return ResponseEntity.ok(problemDTOs);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping (path = "/problem")
    public ResponseEntity<?> createProblem(@Valid @RequestBody ProblemCreateDTO problemCreateDTO){
        try{
            Problem problem = problemService.createProblem(problemCreateDTO);

            ProblemDTO problemDTO = ProblemDTO.convert(problem);

            return ResponseEntity.ok(problemDTO);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping (path = "/problem/{id}")
    public ResponseEntity<?> updateProblem(@Valid @RequestBody ProblemUpdateDTO problemUpdateDTO, @PathVariable String id){
        try{
            Problem problem = problemService.updateProblem(problemUpdateDTO, id);

            ProblemDTO problemDTO = ProblemDTO.convert(problem);

            return ResponseEntity.ok(problemDTO);
        }
        catch(Exception e){
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping (path = "/problem/{id}")
    public ResponseEntity<?> deleteProblem(@PathVariable String id){
        try{
            problemService.deleteProblem(id);

            return ResponseEntity.ok("deleted");
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
