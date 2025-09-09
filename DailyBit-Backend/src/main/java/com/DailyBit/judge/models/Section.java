package com.DailyBit.judge.models;



import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "sections")
public class Section {
    @Id
    @Column(name = "name", length = 50, columnDefinition = "VARCHAR(50) CHECK (LENGTH(name) >= 3 AND LENGTH(name) <= 50)")
    private String name;

    @OneToMany(mappedBy = "section", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    @ToString.Exclude
    private List<Problem> problems;
}
