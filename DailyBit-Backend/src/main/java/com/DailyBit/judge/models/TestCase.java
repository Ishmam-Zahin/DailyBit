package com.DailyBit.judge.models;


import com.DailyBit.judge.others.TestType;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "test_cases")
public class TestCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "problem_id", referencedColumnName = "id", nullable = false)
    @JsonManagedReference
    private Problem problem;

    @Enumerated(EnumType.STRING)
    @Column(name = "test_type", length = 10, nullable = false, columnDefinition = "VARCHAR(10) DEFAULT 'EXACT'")
    @NotNull(message = "Test type cannot be null")
    private TestType testType = TestType.EXACT;
    
    @Column(name = "input", nullable = false, columnDefinition = "TEXT")
    @NotNull(message = "Input cannot be null")
    @NotBlank(message = "Input cannot be blank")
    private String input;

    @Column(name = "output", nullable = false, columnDefinition = "TEXT")
    @NotNull(message = "Output cannot be null")
    @NotBlank(message = "Output cannot be blank")
    private String output;
}
