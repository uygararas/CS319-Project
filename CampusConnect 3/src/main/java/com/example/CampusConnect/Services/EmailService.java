package com.example.CampusConnect.Services;

public interface EmailService {
    void sendVerificationEmail(String to, String verificationLink);

    void sendPasswordResetEmail(String email, String resetUrl);
}
