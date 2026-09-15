package com.DailyBit.problems.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.DailyBit.courses.models.Chapter;
import com.DailyBit.courses.models.Course;
import com.DailyBit.courses.repositories.ChapterRepo;
import com.DailyBit.courses.repositories.CourseRepo;
import com.DailyBit.problems.dtos.ProblemCreateDTO;
import com.DailyBit.problems.dtos.ProblemUpdateDTO;
import com.DailyBit.problems.models.Problem;
import com.DailyBit.problems.repositories.ProblemRepo;

@Service
public class ProblemService {
    private final ProblemRepo problemRepo;
    private final CourseRepo courseRepo;
    private final ChapterRepo chapterRepo;

    public ProblemService(ProblemRepo problemRepo, CourseRepo courseRepo, ChapterRepo chapterRepo){
        this.problemRepo = problemRepo;
        this.courseRepo = courseRepo;
        this.chapterRepo = chapterRepo;
    }

    public Problem createProblem(ProblemCreateDTO problemCreateDTO){
        Course course = courseRepo.findById(problemCreateDTO.getCourseId()).orElseThrow(() -> new RuntimeException("course not found"));
        Chapter chapter = chapterRepo.findById(problemCreateDTO.getChapterId()).orElseThrow(() -> new RuntimeException("chapter not found"));

        Problem problem = Problem.convert(problemCreateDTO, course, chapter);

        problemRepo.save(problem);

        return problem;
    }

    public List<Problem> getProblemByCourseId(Long id){
        return problemRepo.findAllByCourseId(id);
    }

    public List<Problem> getProblemByChapterId(Long id){
        return problemRepo.findAllByChapterId(id);
    }

    public List<Problem> getProblemByBoth(Long courseId, Long chapterId){
        return problemRepo.findAllByCourseIdAndChapterId(courseId, chapterId);
    }

    public List<Problem> gettAllProblems(){
        return problemRepo.findAll();
    }

    public Problem updateProblem(ProblemUpdateDTO problemUpdateDTO, String id){
        Problem problem = problemRepo.findById(id).orElseThrow(() -> new RuntimeException("problem not found"));
        Course course = courseRepo.findById(problemUpdateDTO.getCourseId()).orElseThrow(() -> new RuntimeException("course not found"));
        Chapter chapter = chapterRepo.findById(problemUpdateDTO.getChapterId()).orElseThrow(() -> new RuntimeException("chapter not found"));

        problem.update(problemUpdateDTO, course, chapter);
        problem = problemRepo.save(problem);

        return problem;
    }

    public void deleteProblem(String id){
        Problem problem = problemRepo.findById(id).orElseThrow(() -> new RuntimeException("problem not found"));

        problemRepo.delete(problem);
    }
}
