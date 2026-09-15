package com.DailyBit.problems.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.DailyBit.problems.models.TestCase;

@Repository 
public interface TestCaseRepo extends JpaRepository<TestCase, Long>{
    
}
