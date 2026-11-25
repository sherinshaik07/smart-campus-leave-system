package com.smartLeave.campus.dto;

import com.smartLeave.campus.model.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Role role;
}