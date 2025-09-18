package com.DailyBit.judge.models;


import com.DailyBit.auth.models.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "submissions")
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    @JsonBackReference
    private User user;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "problem_id", referencedColumnName = "id", nullable = false)
    @JsonBackReference
    private Problem problem;

    @Column(name = "resutl", nullable = false, columnDefinition = "TEXT")
    private String result;

    @Column(name = "submit_time", nullable = false)
    private LocalDateTime submitTime =  LocalDateTime.now();

    @Column(name = "code", nullable = false, columnDefinition = "TEXT")
    private String code;
}
