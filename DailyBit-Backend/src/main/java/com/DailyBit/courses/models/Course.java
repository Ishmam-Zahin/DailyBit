package com.DailyBit.courses.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table (name = "courses")
@Getter
@Setter
@NoArgsConstructor 
public class Course {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;


    @Column (length = 100, nullable = false, unique = true)
    private String name;

    @OneToMany (mappedBy = "course", cascade = CascadeType.ALL)
    private List<Chapter> chapters = new ArrayList<>();
}
