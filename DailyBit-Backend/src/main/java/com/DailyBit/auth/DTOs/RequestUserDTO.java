package com.DailyBit.auth.DTOs;


import com.DailyBit.auth.others.Gender;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestUserDTO {

    @Email(message = "should be a valid email")
    @NotBlank(message = "email can not be blank")
    @NotNull(message = "email can not be null")
    @Size(min = 1, max = 100, message = "email must be between 1 to 100 characters")
    private String email;

    @NotBlank(message = "user name can not be null")
    @NotNull(message = "user name can not be blank")
    @Size(min = 3, max = 20, message = "user name must be between 3 to 20 characters")
    @Pattern(regexp = "^[a-z0-9_]+$", message = "only lowercase letters, digits, and underscores are allowed")
    private String userName;

    @NotNull(message = "password can not be null")
    @NotBlank(message = "password can not be blank")
    @Size(min = 4, max = 20, message = "password too small or too big")
    private String password;

    @NotNull(message = "age can not be null")
    @Min(value = 12, message = "minimum age is 12")
    @Max(value = 100, message = "maximum age is 100")
    private Integer age;

    @NotNull(message = "gender can not be null")
    private Gender gender = Gender.MALE;

}
