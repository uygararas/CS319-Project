package com.example.CampusConnect.DTO;

import lombok.Getter;

@Getter
public class PasswordChangeRequest {
    private String email;
    private String newPassword;
}
