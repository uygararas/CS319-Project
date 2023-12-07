package com.example.CampusConnect.Controllers;

import com.example.CampusConnect.Services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.view.RedirectView;
import com.example.CampusConnect.Services.UserService;
import com.example.CampusConnect.Util.*;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller

@CrossOrigin(origins = "http://localhost:5173")
public class AuthenticationController {
    private final UserService userService;
    private final JwtUtil jwtUtil;
    @Autowired
    public AuthenticationController(UserService userService,  JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);
    @PostMapping("/user/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        Long userId = userService.getUserIdByEmail(email);
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
            // Inside the login method after successful authentication
            String token = jwtUtil.generateToken(userId); // Assuming jwtUtil is a JWT utility class
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("token", token, "success", true));

        } catch (Exception e) {
            logger.error("Login error: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login error");
        }
    }
}

