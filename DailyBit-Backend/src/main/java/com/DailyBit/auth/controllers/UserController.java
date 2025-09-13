package com.DailyBit.auth.controllers;


import com.DailyBit.auth.DTOs.RequestUserDTO;
import com.DailyBit.auth.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/auth/create-account", consumes = "multipart/form-data")
    public ResponseEntity<?> createAccount(@Valid @ModelAttribute RequestUserDTO requestUserDTO, @RequestParam(name = "image") MultipartFile imageFile, BindingResult result) {
        Map<String, Object> message = new HashMap<>();

        if(result.hasErrors()) {
            message.put("message", "invalid form data");
            return ResponseEntity.badRequest().body(message);
        }
        System.out.println(imageFile.getOriginalFilename());

        return ResponseEntity.ok("success");
    }
}
