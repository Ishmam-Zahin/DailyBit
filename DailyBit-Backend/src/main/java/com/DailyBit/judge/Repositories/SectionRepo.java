package com.DailyBit.judge.Repositories;

import com.DailyBit.judge.models.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SectionRepo extends JpaRepository<Section, String> {
}
