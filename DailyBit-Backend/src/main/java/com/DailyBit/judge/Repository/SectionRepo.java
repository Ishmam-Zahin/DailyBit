package com.DailyBit.judge.Repository;

import com.DailyBit.judge.models.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SectionRepo extends JpaRepository<Section, String> {
}
