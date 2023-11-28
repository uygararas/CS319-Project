package com.example.CampusConnect.Controllers;

import com.example.CampusConnect.Services.UserService;
import com.example.CampusConnect.Entities.CCuser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")

public class UserController {

    @Autowired
    private UserService userService;

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

}
