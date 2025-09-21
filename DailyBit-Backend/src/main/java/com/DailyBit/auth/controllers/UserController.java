package com.DailyBit.auth.controllers;


import com.DailyBit.auth.DTOs.AuthRequestDTO;
import com.DailyBit.auth.DTOs.RequestUserDTO;
import com.DailyBit.auth.models.MyUserDetails;
import com.DailyBit.auth.services.JWTUtils;
import com.DailyBit.auth.services.UserService;
import com.DailyBit.exceptionModel.CustomException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
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
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequestDTO authRequestDTO, BindingResult result, HttpServletResponse response) {
        Map<String, Object> message = new HashMap<>();

        if(result.hasErrors()) {
            message.put("message", "invalid form data");
            return ResponseEntity.badRequest().body(message);
        }

        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequestDTO.getUserName(), authRequestDTO.getPassword())
            );
            MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
            String token = jwtUtils.generateToken(userDetails);
            ResponseCookie jwtCookie = ResponseCookie
                    .from("jwt_token", token)
                            .httpOnly(true)
                                    .secure(true)
                                            .path("/")
                                                    .sameSite("None")
                                                            .build();
            response.addHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());
            message.put("userName",  userDetails.getUsername());
            message.put("avatar", userDetails.getAvatarLink());
            message.put("token", token);
            return ResponseEntity.ok(message);
        }
        catch (Exception e){
            message.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(message);
        }
    }

    @GetMapping("auth/logout")
    public ResponseEntity<?> logout(HttpServletResponse response, @AuthenticationPrincipal MyUserDetails myUserDetails) {
        Map<String, Object> message = new HashMap<>();
        if(myUserDetails == null) {
            message.put("message", "user already logged out");
            return ResponseEntity.badRequest().body(message);
        }
        ResponseCookie jwtCookie = ResponseCookie
                .from("jwt_token", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .sameSite("None")
                .maxAge(0)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());
        message.put("message", "success");
        return ResponseEntity.ok(message);
    }

    @GetMapping("/auth/userInfo")
    public ResponseEntity<?> getUserInfo(@AuthenticationPrincipal MyUserDetails myUserDetails, @RequestHeader("Authorization") String token) {
        Map<String, Object> message = new HashMap<>();
        if(myUserDetails == null) {
            message.put("message", "invalid user");
            return ResponseEntity.badRequest().body(message);
        }
        message.put("userName", myUserDetails.getUsername());
        message.put("avatar", myUserDetails.getAvatarLink());
        message.put("roles", myUserDetails.getAuthorities());
        token = token.substring(7);
        message.put("token", token);

        return ResponseEntity.ok(message);
    }
}
