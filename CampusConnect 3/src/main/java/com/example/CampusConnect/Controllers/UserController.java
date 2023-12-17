package com.example.CampusConnect.Controllers;

import com.example.CampusConnect.DTO.PasswordChangeRequest;
import com.example.CampusConnect.Services.UserService;
import com.example.CampusConnect.Entities.CCuser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")

public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user/register")
    public ResponseEntity<?> registerUser(@RequestBody CCuser user) {
        userService.registerUser(user);
        return ResponseEntity.ok("Registration successful, please check your email to verify your account.");
    }

    @PostMapping("/user/request-password-reset")
    public ResponseEntity<?> requestPasswordReset(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        boolean emailSent = userService.sendPasswordResetEmail(email);
        if (emailSent) {
            return ResponseEntity.ok("Password reset email sent, please check your email.");
        } else {
            return ResponseEntity.badRequest().body("Error sending password reset email.");
        }
    }

    @GetMapping("/user/verify-for-password-reset")
    public ResponseEntity<?> verifyForPasswordReset(@RequestParam String token) {
        boolean isVerified = userService.verifyEmailForPasswordReset(token);
        if (isVerified) {
            return ResponseEntity.ok("Email verified successfully for password reset.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email verification failed or token already used.");
        }
    }

    @GetMapping("/user/verify")
    public ResponseEntity<?> verifyUser(@RequestParam String token) {
        boolean isVerified = userService.verifyUser(token);

        if (isVerified) {
            return ResponseEntity.ok("Email successfully verified.");
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired verification token.");
        }
    }

    @PostMapping("/user/change-password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeRequest request) {
        try {
            boolean success = userService.changePassword(request.getEmail(), request.getNewPassword());
            if (success) {
                return ResponseEntity.ok("Password changed successfully");
            } else {
                return ResponseEntity.badRequest().body("Password change failed: User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @PostMapping("/user/change-password-forgot")
    public ResponseEntity<?> changePasswordForgot(@RequestBody PasswordChangeRequest request) {
        try {
            boolean success = userService.changePassword(request.getEmail(), request.getNewPassword());
            if (success) {
                return ResponseEntity.ok("Password changed successfully");
            } else {
                return ResponseEntity.badRequest().body("Password change failed: User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/getEmailByUserId")
    public ResponseEntity<String> getEmailByUserId(@RequestParam Long userId) {
        try {
            String email = userService.getEmailByUserId(userId);
            return ResponseEntity.ok(email);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @GetMapping("/check-verification-status")
    public ResponseEntity<?> checkVerificationStatus(@RequestParam String email) {
        try {
            // Method in UserService to check verification status
            boolean isVerified = userService.checkEmailVerificationStatus(email);
            return ResponseEntity.ok(Map.of("isEmailVerifiedForPasswordChange", isVerified));
        } catch (Exception e) {
            // Handle exceptions accordingly
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error checking verification status: " + e.getMessage());
        }
    }
}