package com.DailyBit.judge.controllers;


import com.DailyBit.judge.DTOs.RequestProblemDTO;
import com.DailyBit.judge.models.Problem;
import com.DailyBit.judge.models.Section;
import com.DailyBit.judge.services.ProblemService;
import com.DailyBit.judge.services.SectionService;
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
@CrossOrigin(origins = "*")
public class ProblemController {

    private final ProblemService problemService;
    private final SectionService sectionService;

    @Autowired
    public ProblemController(ProblemService problemService, SectionService sectionService) {
        this.problemService = problemService;
        this.sectionService = sectionService;
    }

    @GetMapping("/problems")
    public List<Problem> getProblemList(
            @RequestParam(name = "name", required = false, defaultValue = "") String name,
            @RequestParam(name = "sectionName", required = false, defaultValue = "") String sectionName,
            @RequestParam(name = "chapterNo", required = false, defaultValue = "-1") int chapterNo
    ){

        return problemService.getProblemList(
                name,
                sectionName,
                chapterNo
        );
    }

    @PostMapping("/problems")
    public ResponseEntity<?> addProblem(@Valid @RequestBody RequestProblemDTO  requestProblemDTO, BindingResult result){
        Map<String, Object> message = new HashMap<>();
        if(result.hasErrors()){
            System.out.println("x");
            message.put("message","faliled");
            message.put("errors", result.getAllErrors());
            return ResponseEntity.badRequest().body(message);
        }
        try{
            Problem problem = new Problem();
            Section section = sectionService.getSectionByName(requestProblemDTO.getSectionName());
            System.out.println(section);
            problem.setId(requestProblemDTO.getId());
            problem.setName(requestProblemDTO.getName());
            problem.setSection(section);
            problem.setChapterNo(requestProblemDTO.getChapterNo());
            problem.setTimeLimit(requestProblemDTO.getTimeLimit());
            problem.setTimeout(requestProblemDTO.getTimeout());

            problemService.addProblem(problem);
            message.put("message", "success");
            return ResponseEntity.ok().body(message);

        }
        catch (Exception e){
            message.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        }
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
