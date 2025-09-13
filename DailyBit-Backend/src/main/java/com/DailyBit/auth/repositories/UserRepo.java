package com.DailyBit.auth.repositories;

import com.DailyBit.auth.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Integer> {

    Optional<User> findByUserName(String username);
    Optional<User> findByEmail(String email);
}
