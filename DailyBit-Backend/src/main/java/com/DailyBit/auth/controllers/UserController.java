package com.DailyBit.auth.controllers;


import com.DailyBit.auth.DTOs.AuthRequestDTO;
import com.DailyBit.auth.DTOs.RequestUserDTO;
import com.DailyBit.auth.services.JWTUtils;
import com.DailyBit.auth.services.UserService;
import com.DailyBit.exceptionModel.CustomException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtUtils;

    @Autowired
    public UserController(UserService userService,
                          AuthenticationManager authenticationManager,
                          JWTUtils jwtUtils) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping(value = "/auth/create-account", consumes = "multipart/form-data")
    public ResponseEntity<?> createAccount(@Valid @ModelAttribute RequestUserDTO requestUserDTO, @RequestParam(name = "image") MultipartFile imageFile, BindingResult result) {
        Map<String, Object> message = new HashMap<>();

        if(result.hasErrors()) {
            message.put("message", "invalid form data");
            return ResponseEntity.badRequest().body(message);
        }
        if(imageFile.isEmpty()){
            message.put("message", "image is empty");
            return ResponseEntity.badRequest().body(message);
        }
        if(imageFile.getSize()>512000){
            message.put("message", "image is too large limit is 512kb");
            return ResponseEntity.badRequest().body(message);
        }
        try{
            userService.addNormalUser(requestUserDTO, imageFile);
            message.put("message", "success");
            return ResponseEntity.ok(message);
        }
        catch (Exception e){
            message.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(message);
        }
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequestDTO authRequestDTO, BindingResult result) {
        Map<String, Object> message = new HashMap<>();

        if(result.hasErrors()) {
            message.put("message", "invalid form data");
            return ResponseEntity.badRequest().body(message);
        }

        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequestDTO.getUserName(), authRequestDTO.getPassword())
            );
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtils.generateToken(userDetails);
            message.put("message", "success");
            message.put("token", token);
            return ResponseEntity.ok(message);
        }
        catch (Exception e){
            message.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(message);
        }
    }
}
