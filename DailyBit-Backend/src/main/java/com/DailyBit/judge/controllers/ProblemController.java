package com.DailyBit.judge.controllers;


import com.DailyBit.judge.models.Problem;
import com.DailyBit.judge.services.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProblemController {

    private final ProblemService problemService;

    @Autowired
    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    @GetMapping("/problems")
    public List<Problem> getProblemList(){
        return problemService.getProblemList();
    }

    @PostMapping("/problems")
    public Problem addProblem(@RequestBody Problem problem){
        return problemService.addProblem(problem);
    }

    @GetMapping("/problem/{id}")
    public ResponseEntity<?> getProblem(@PathVariable String id){
        try{
            Problem p = problemService.getProblemById(id);
            return ResponseEntity.ok(p);
        }
        catch (Exception e){
            Map<String,Object> response = new HashMap<>();
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PostMapping("/problem")
    public Problem updateProblem(@RequestBody Problem problem){
        return problemService.updateProblem(problem);
    }

    @DeleteMapping("/problem/{id}")
    public void deleteProblem(@PathVariable String id){
        problemService.deleteProblemById(id);
    }
}
