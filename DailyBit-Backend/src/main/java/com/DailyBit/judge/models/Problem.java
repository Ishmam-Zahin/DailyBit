package com.DailyBit.judge.models;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.ToString;
import org.hibernate.annotations.Check;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "problems")
@Check(constraints = "time_limit < time_out")
public class Problem {
    @Id
    @Column(name = "id", length = 10)
    private String id;

    @Column(name = "name", length = 100, nullable = false, unique = true, columnDefinition = "VARCHAR(100) CHECK (LENGTH(name) >= 5 AND LENGTH(name) <= 100)")
    private String name;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "section_name", referencedColumnName = "name", nullable = false)
    @JsonManagedReference
    private Section section;

    @Column(name = "chapter_no", nullable = false, columnDefinition = "INT CHECK (chapter_no >= 1 AND chapter_no <= 500)")
    private Integer chapterNo;

    @Column(name = "time_limit", nullable = false, columnDefinition = "INT DEFAULT 2 CHECK (time_limit >= 1 AND time_limit <= 5)")
    private Integer timeLimit = 2;

    @Column(name = "time_out", nullable = false, columnDefinition = "INT DEFAULT 5 CHECK (time_out >= 1 AND time_out <= 10)")
    private Integer timeout = 5;

    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    @ToString.Exclude
    private List<TestCase> testCases;
}
