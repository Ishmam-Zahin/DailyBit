package com.DailyBit.judge.controllers;


import com.DailyBit.judge.DTOs.RequestProblemDTO;
import com.DailyBit.judge.DTOs.ResponseProblemDTO;
import com.DailyBit.judge.DTOs.ResponseProblemWithTestCasesDTO;
import com.DailyBit.judge.services.ProblemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ProblemController {

    private final ProblemService problemService;

    @Autowired
    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    @GetMapping("/problems")
    public ResponseEntity<?> getProblemList(
            @RequestParam(name = "name", required = false, defaultValue = "") String name,
            @RequestParam(name = "sectionName", required = false, defaultValue = "all") String sectionName,
            @RequestParam(name = "chapterNo", required = false, defaultValue = "-1") int chapterNo
    ){
        Map<String, Object> message = new HashMap<>();

        try{
            List<ResponseProblemDTO> problems = problemService.getProblemList(
                    name,
                    sectionName,
                    chapterNo
            );
            return ResponseEntity.ok(problems);
        }
        catch(Exception e){
            message.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(message);
        }
    }

    @PostMapping("/problems")
    public ResponseEntity<?> addProblem(@Valid @RequestBody RequestProblemDTO  requestProblemDTO, BindingResult result){
        Map<String, Object> message = new HashMap<>();

        if(result.hasErrors()){
            message.put("message","invalid form data");
            return ResponseEntity.badRequest().body(message);
        }
        try{
            problemService.addProblem(requestProblemDTO);
            message.put("message","success");
            return ResponseEntity.ok(message);

        }
        catch (Exception e){
            message.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        }
    }

    @GetMapping("/problem/{id}")
    public ResponseEntity<?> getProblem(@PathVariable String id){
        Map<String,Object> message = new HashMap<>();
        try{
            ResponseProblemWithTestCasesDTO p = problemService.getProblemById(id);
            return ResponseEntity.ok(p);
        }
        catch (Exception e){
            message.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        }
    }

    @PutMapping("/problem")
    public ResponseEntity<?> updateProblem(@Valid @RequestBody RequestProblemDTO requestProblemDTO, BindingResult result){
        Map<String, Object> message = new HashMap<>();
        if(result.hasErrors()){
            message.put("message","invalid form data");
            return  ResponseEntity.badRequest().body(message);
        }
        try{
            problemService.updateProblem(requestProblemDTO);
            message.put("message","success");
            return ResponseEntity.ok(message);
        }
        catch (Exception e){
            message.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(message);
        }
    }

    @DeleteMapping("/problem/{id}")
    public ResponseEntity<?> deleteProblem(@PathVariable String id){
        Map<String, Object> message = new HashMap<>();
        try{
            problemService.deleteProblemById(id);
            message.put("message","success");
            return ResponseEntity.ok().body(message);
        }
        catch (Exception e){
            message.put("message", e.getMessage());
            return  ResponseEntity.badRequest().body(message);
        }
    }
}
