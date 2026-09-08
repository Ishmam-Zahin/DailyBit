package com.DailyBit.courses.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DailyBit.courses.dto.ChapterCreateDTO;
import com.DailyBit.courses.dto.ChapterDTO;
import com.DailyBit.courses.services.ChapterService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/chapters")
public class ChapterController {
    private final ChapterService chapterService;

    public ChapterController(ChapterService chapterService){
        this.chapterService = chapterService;
    }

    @PostMapping
    public ResponseEntity<?> createChapter(@Valid @RequestBody ChapterCreateDTO dto){
        try{
            ChapterDTO chapterDTO = chapterService.createChapter(dto);
            return ResponseEntity.ok(chapterDTO);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteChapter(@PathVariable Long id){
        try{
            chapterService.deleteChapter(id);
            return ResponseEntity.ok("deleted");
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
