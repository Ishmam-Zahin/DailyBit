package com.DailyBit.auth.controllers;


import com.DailyBit.auth.DTOs.LoginRequestDTO;
import com.DailyBit.auth.DTOs.UserCreateDTO;
import com.DailyBit.auth.DTOs.UserResponseDTO;
import com.DailyBit.auth.models.MyUserDetails;
import com.DailyBit.auth.services.JWTUtils;
import com.DailyBit.auth.services.UserService;
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
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
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
    public ResponseEntity<?> createAccount(@Valid @ModelAttribute UserCreateDTO requestUserDTO, @RequestParam(name = "image") MultipartFile imageFile, BindingResult result) {

        if(result.hasErrors()) {
            return ResponseEntity.badRequest().body("invalid form data");
        }
        if(imageFile.isEmpty()){
            return ResponseEntity.badRequest().body("image is empty");
        }
        if(imageFile.getSize()>512000){
            return ResponseEntity.badRequest().body("image is too large limit is 512kb");
        }
        try{
            userService.addNormalUser(requestUserDTO, imageFile);
            return ResponseEntity.ok("created");
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO authRequestDTO, BindingResult result, HttpServletResponse response) {

        if(result.hasErrors()) {
            return ResponseEntity.badRequest().body("invalid form data");
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
            UserResponseDTO user = new UserResponseDTO();
            user.setId(userDetails.getUserId());
            user.setUserName(userDetails.getUsername());
            user.setAvatarLink(userDetails.getAvatarLink());
            user.setRole(userDetails.getRole());
            user.setToken(token);
            return ResponseEntity.ok(user);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("auth/logout")
    public ResponseEntity<?> logout(HttpServletResponse response, @AuthenticationPrincipal MyUserDetails myUserDetails) {
        if(myUserDetails == null) {
            return ResponseEntity.badRequest().body("user already logged out");
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
        return ResponseEntity.ok("success");
    }

    @GetMapping("/auth/userInfo")
    public ResponseEntity<?> getUserInfo(@AuthenticationPrincipal MyUserDetails myUserDetails, @RequestHeader("Authorization") String token) {
        UserResponseDTO user = new UserResponseDTO();
        if(myUserDetails == null) {
            return ResponseEntity.ok(user);
        }
        token = token.substring(7);
        user.setId(myUserDetails.getUserId());
        user.setUserName(myUserDetails.getUsername());
        user.setAvatarLink(myUserDetails.getAvatarLink());
        user.setRole(myUserDetails.getRole());
        user.setToken(token);

        return ResponseEntity.ok(user);
    }
}
