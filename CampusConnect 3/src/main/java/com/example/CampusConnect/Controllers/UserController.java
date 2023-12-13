package com.example.CampusConnect.Controllers;

import com.example.CampusConnect.DTO.PasswordChangeRequest;
import com.example.CampusConnect.Services.ItemService;
import com.example.CampusConnect.Services.UserService;
import com.example.CampusConnect.Entities.CCuser;
import com.example.CampusConnect.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

@RestController
//@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")

public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Existing endpoint for user registration
    @PostMapping("/user/register")
    public ResponseEntity<?> registerUser(@RequestBody CCuser user) {
        userService.registerUser(user);
        return ResponseEntity.ok("Registration successful, please check your email to verify your account.");
    }


    // Endpoint for verifying user email
    @GetMapping("/user/verify")
    public ResponseEntity<?> verifyUser(@RequestParam String token) {
        boolean isVerified = userService.verifyUser(token);

        if (isVerified) {
            return ResponseEntity.ok("Email successfully verified.");
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired verification token.");
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeRequest request) {
        try {
            boolean success = userService.changePassword(request.getEmail(), request.getNewPassword());
            if (success) {
                return ResponseEntity.ok().body("Password changed successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password change failed");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    // UserController.java
    @GetMapping("/getEmailByUserId")
    public ResponseEntity<String> getEmailByUserId(@RequestParam Long userId) {
        try {
            String email = userService.getEmailByUserId(userId);
            return ResponseEntity.ok(email);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }


/*
    //Endpoint for authenticating a user while logging in
    //@GetMapping("/user/authenticate")
    @PostMapping("/user/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        boolean isValidUser = userService.checkCredentials(email, password);

        if (isValidUser) {
            // Create a simple success response. Normally, you would create a JWT or similar token here.
            return ResponseEntity.ok(Map.of("success", true));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        }
    }*/
}
