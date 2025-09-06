package com.DailyBit.judge.services;


import com.DailyBit.judge.Repository.ProblemRepo;
import com.DailyBit.judge.models.Problem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class ProblemService {

    private final ProblemRepo problemRepo;

    @Autowired
    public ProblemService(ProblemRepo problemRepo) {
        this.problemRepo = problemRepo;
    }

    public List<Problem> getProblemList(){
        return problemRepo.findAll();
    }

    public Problem addProblem(Problem problem){
        return problemRepo.save(problem);
    }

    public Problem getProblemById(String id) throws FileNotFoundException {
        Optional<Problem> optionalProblem = problemRepo.findById(id);
        return optionalProblem.orElseThrow(() -> new FileNotFoundException("File Not Found"));
    }

    public Problem updateProblem(Problem problem){
        return problemRepo.save(problem);
    }

    public void deleteProblemById(String id){
        problemRepo.deleteById(id);
    }
}
