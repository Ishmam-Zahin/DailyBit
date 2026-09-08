package com.DailyBit.auth.DTOs;

import com.DailyBit.auth.others.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
    private String userName = null;
    private String avatarLink = null;
    private Role role = null;
    private String token = null;
}
