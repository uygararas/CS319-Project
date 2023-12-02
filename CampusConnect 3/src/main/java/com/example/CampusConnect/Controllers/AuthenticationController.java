package com.example.CampusConnect.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.view.RedirectView;
import com.example.CampusConnect.Services.UserService;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;

@Controller

@CrossOrigin(origins = "http://localhost:5173")
public class AuthenticationController {
    @Autowired
    private UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);
    @PostMapping("/user/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        try {
            logger.info("Login attempt for email: " + email);
            if (!userService.emailExists(email)) {
                logger.warn("Email not found: " + email);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
            }

            if (!userService.verifyPassword(email, password)) {
                logger.warn("Invalid credentials for email: " + email);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }

            if (!userService.verifyIsEmailVerified(email)) {
                // Handle case where email is not verified
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email not verified");
            }

            logger.info("Authentication successful for email: " + email);
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("success", true));
        } catch (Exception e) {
            logger.error("Login error: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login error");
        }
    }
}

