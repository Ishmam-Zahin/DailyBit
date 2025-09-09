package com.DailyBit.judge.controllers;

import com.DailyBit.judge.models.Section;
import com.DailyBit.judge.services.SectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SectionController {

    private final SectionService sectionService;

    @Autowired
    public SectionController(SectionService sectionService) {
        this.sectionService = sectionService;
    }

    @GetMapping("/sections")
    public ResponseEntity<?> getSectionList(){
        Map<String, Object> message =  new HashMap<>();

        try{
            List<Section> sections =  sectionService.getSectionList();
            return ResponseEntity.ok().body(sections);
        }
        catch (Exception e){
            message.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(message);
        }
    }
}
