package com.DailyBit.auth.DTOs;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequestDTO {

    @NotBlank(message = "user name can not be null")
    @NotNull(message = "user name can not be blank")
    @Size(min = 3, max = 20, message = "user name must be between 3 to 20 characters")
    @Pattern(regexp = "^[a-z0-9_]+$", message = "only lowercase letters, digits, and underscores are allowed")
    private String userName;

    @NotNull(message = "password can not be null")
    @NotBlank(message = "password can not be blank")
    @Size(min = 4, max = 20, message = "password too small or too big")
    private String password;
}
