package com.DailyBit.auth.models;


import com.DailyBit.auth.others.Gender;
import com.DailyBit.auth.others.Role;
import com.DailyBit.judge.models.Submission;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", unique = true, nullable = false, length = 100)
    private String email;

    @Column(name = "user_name", unique = true, nullable = false, length = 20)
    private String userName;

    @Column(name = "password", nullable = false, length = 100)
    private String password;

    @Column(name = "age", nullable = false)
    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false, length = 15)
    private Gender gender;

    @Column(name = "avatar", nullable = false, length = 500)
    private String avatar;

    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(name = "is_active", nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean isActive = true;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 5, columnDefinition = "VARCHAR(5) DEFAULT 'USER'")
    private Role role = Role.USER;

    @OneToMany(mappedBy = "user", cascade =  CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    @ToString.Exclude
    private List<Submission> submissions;



    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
