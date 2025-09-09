package com.DailyBit.judge.services;


import com.DailyBit.exceptionModel.CustomException;
import com.DailyBit.judge.DTOs.RequestProblemDTO;
import com.DailyBit.judge.DTOs.ResponseProblemDTO;
import com.DailyBit.judge.Repository.ProblemRepo;
import com.DailyBit.judge.models.Problem;
import com.DailyBit.judge.models.Section;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class ProblemService {

    private final ProblemRepo problemRepo;
    private final SectionService sectionService;

    @Autowired
    public ProblemService(ProblemRepo problemRepo, SectionService sectionService) {
        this.problemRepo = problemRepo;
        this.sectionService = sectionService;
    }

    private ResponseProblemDTO convertToDTO(Problem problem) {

        ResponseProblemDTO responseProblemDTO = new ResponseProblemDTO();

        responseProblemDTO.setId(problem.getId());
        responseProblemDTO.setName(problem.getName());
        responseProblemDTO.setSection(problem.getSection());
        responseProblemDTO.setChapterNo(problem.getChapterNo());
        responseProblemDTO.setTimeLimit(problem.getTimeLimit());
        responseProblemDTO.setTimeout(problem.getTimeout());
        responseProblemDTO.setTestCases(problem.getTestCases());

        return responseProblemDTO;
    }

    private Problem convertToProblem(RequestProblemDTO requestProblemDTO) throws FileNotFoundException {

        Problem problem = new Problem();

        Section section = sectionService.getSectionByName(requestProblemDTO.getSectionName());
        problem.setId(requestProblemDTO.getId());
        problem.setName(requestProblemDTO.getName());
        problem.setSection(section);
        problem.setChapterNo(requestProblemDTO.getChapterNo());
        problem.setTimeLimit(requestProblemDTO.getTimeLimit());
        problem.setTimeout(requestProblemDTO.getTimeout());

        return problem;
    }

    public List<Problem> getProblemList(
            String name,
            String sectionName,
            int chapterNo
    ){
        return problemRepo.filterProblems(name, sectionName, chapterNo);
    }

    public void addProblem(RequestProblemDTO requestProblemDTO) throws CustomException, FileNotFoundException {
        Optional<Problem> p = problemRepo.findById(requestProblemDTO.getId());
        if(p.isEmpty()){
            Problem newProblem = this.convertToProblem(requestProblemDTO);
            problemRepo.save(newProblem);
        }
        else{
            throw new CustomException("Problem already exists!");
        }
    }

    public ResponseProblemDTO getProblemById(String id) throws FileNotFoundException {
        Optional<Problem> optionalProblem = problemRepo.findById(id);
        Problem problem = optionalProblem.orElseThrow(() -> new FileNotFoundException("File Not Found"));

        return convertToDTO(problem);
    }

    public void updateProblem(RequestProblemDTO requestProblemDTO) throws CustomException, FileNotFoundException {
        problemRepo.findById(requestProblemDTO.getId()).orElseThrow(() -> new FileNotFoundException("File Not Found"));
        Problem updatedProblem = this.convertToProblem(requestProblemDTO);
        problemRepo.save(updatedProblem);
    }

    public void deleteProblemById(String id) throws CustomException {
        if(!problemRepo.existsById(id)){
            throw new CustomException("Problem do not exist!");
        }
        problemRepo.deleteById(id);
    }
}
