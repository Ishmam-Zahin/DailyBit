package com.DailyBit.auth.services;


import com.DailyBit.auth.DTOs.RequestUserDTO;
import com.DailyBit.auth.models.User;
import com.DailyBit.auth.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserService {

    private UserRepo userRepo;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    private User convertToUser(RequestUserDTO requestUserDTO) {
        User user = new User();
        user.setEmail(requestUserDTO.getEmail());
        user.setUserName(requestUserDTO.getUserName());
        user.setPassword(passwordEncoder.encode(requestUserDTO.getPassword()));
        user.setAge(requestUserDTO.getAge());
        user.setGender(requestUserDTO.getGender());

        return  user;
    }

    public void addNormalUser(RequestUserDTO requestUserDTO, MultipartFile imageFile) {
        User user = convertToUser(requestUserDTO);
        userRepo.save(user);
    }
}
