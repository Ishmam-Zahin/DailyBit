package com.DailyBit.judge.services;


import com.DailyBit.exceptionModel.CustomException;
import com.DailyBit.judge.DTOs.RequestProblemDTO;
import com.DailyBit.judge.DTOs.ResponseProblemDTO;
import com.DailyBit.judge.DTOs.ResponseProblemWithTestCasesDTO;
import com.DailyBit.judge.Repository.ProblemRepo;
import com.DailyBit.judge.Repository.SectionRepo;
import com.DailyBit.judge.models.Problem;
import com.DailyBit.judge.models.Section;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class ProblemService {

    private final ProblemRepo problemRepo;
    private final SectionRepo sectionRepo;

    @Autowired
    public ProblemService(ProblemRepo problemRepo, SectionRepo sectionRepo) {
        this.problemRepo = problemRepo;
        this.sectionRepo = sectionRepo;
    }

    private ResponseProblemWithTestCasesDTO convertToWithTestCasesDTO(Problem problem) {

        ResponseProblemWithTestCasesDTO responseProblemWithTestCasesDTO = new ResponseProblemWithTestCasesDTO();

        responseProblemWithTestCasesDTO.setId(problem.getId());
        responseProblemWithTestCasesDTO.setName(problem.getName());
        responseProblemWithTestCasesDTO.setSection(problem.getSection());
        responseProblemWithTestCasesDTO.setChapterNo(problem.getChapterNo());
        responseProblemWithTestCasesDTO.setTimeLimit(problem.getTimeLimit());
        responseProblemWithTestCasesDTO.setTimeout(problem.getTimeout());
        responseProblemWithTestCasesDTO.setTestCases(problem.getTestCases());
        responseProblemWithTestCasesDTO.setDefaultTemplate(problem.getDefaultTemplate());

        return responseProblemWithTestCasesDTO;
    }

    private ResponseProblemDTO convertToDTO(Problem problem) {

        ResponseProblemDTO responseProblemDTO = new ResponseProblemDTO();

        responseProblemDTO.setId(problem.getId());
        responseProblemDTO.setName(problem.getName());
        responseProblemDTO.setSection(problem.getSection());
        responseProblemDTO.setChapterNo(problem.getChapterNo());
        responseProblemDTO.setTimeLimit(problem.getTimeLimit());
        responseProblemDTO.setTimeout(problem.getTimeout());
        responseProblemDTO.setDefaultTemplate(problem.getDefaultTemplate());

        return responseProblemDTO;
    }

    private Problem convertToProblem(RequestProblemDTO requestProblemDTO) throws FileNotFoundException {

        Problem problem = new Problem();

        Section section = sectionRepo.findById(requestProblemDTO.getSectionName()).orElseThrow(() -> new FileNotFoundException("section not found"));
        problem.setId(requestProblemDTO.getId());
        problem.setName(requestProblemDTO.getName());
        problem.setSection(section);
        problem.setChapterNo(requestProblemDTO.getChapterNo());
        problem.setTimeLimit(requestProblemDTO.getTimeLimit());
        problem.setTimeout(requestProblemDTO.getTimeout());
        problem.setDefaultTemplate(requestProblemDTO.getDefaultTemplate());

        return problem;
    }

    public List<ResponseProblemDTO> getProblemList(
            String name,
            String sectionName,
            int chapterNo
    ){
        List<Problem> problems = problemRepo.filterProblems(name, sectionName, chapterNo);
        return problems.stream().map(this::convertToDTO).toList();
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

    public ResponseProblemWithTestCasesDTO getProblemById(String id) throws FileNotFoundException {
        Optional<Problem> optionalProblem = problemRepo.findById(id);
        Problem problem = optionalProblem.orElseThrow(() -> new FileNotFoundException("File Not Found"));

        return convertToWithTestCasesDTO(problem);
    }

    public void updateProblem(RequestProblemDTO requestProblemDTO) throws FileNotFoundException {
        problemRepo.findById(requestProblemDTO.getId()).orElseThrow(() -> new FileNotFoundException("Problem Not Found"));
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
