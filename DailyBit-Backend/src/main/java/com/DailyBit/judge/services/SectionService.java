package com.DailyBit.judge.services;


import com.DailyBit.judge.Repository.SectionRepo;
import com.DailyBit.judge.models.Section;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class SectionService {

    private final SectionRepo sectionRepo;

    public SectionService(SectionRepo sectionRepo) {
        this.sectionRepo = sectionRepo;
    }

    public List<Section> getSectionList(){
        return sectionRepo.findAll();
    }

    public Section getSectionByName(String name) throws FileNotFoundException {
        Optional<Section> optional = sectionRepo.findById(name);
        return optional.orElseThrow(() -> new FileNotFoundException("Section not found!"));
    }
}
