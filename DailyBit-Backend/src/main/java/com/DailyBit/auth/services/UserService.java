package com.DailyBit.auth.services;


import com.DailyBit.auth.DTOs.RequestUserDTO;
import com.DailyBit.auth.models.User;
import com.DailyBit.auth.repositories.UserRepo;
import com.DailyBit.exceptionModel.CustomException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

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

    public void addNormalUser(RequestUserDTO requestUserDTO, MultipartFile imageFile) throws IOException, CustomException {
        User user = convertToUser(requestUserDTO);
        String url = "https://api.imgbb.com/1/upload?key=24546794f81b57cfd03499f9aa1fe834";
        ByteArrayResource imageResource = new ByteArrayResource(imageFile.getBytes()) {
            @Override
            public String getFilename() {
                return user.getUserName(); // Required for multipart to treat it as a file
            }
        };
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("image", imageResource);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = new RestTemplate().exchange(url, HttpMethod.POST, request, String.class);
        if(response.getStatusCode() != HttpStatus.OK){
            throw new CustomException("image upload failed");
        }
        ObjectMapper mapper = new ObjectMapper();
        JsonNode json = mapper.readTree(response.getBody());
        user.setAvatar(json.get("data").get("url").asText());

        userRepo.save(user);
    }
}
