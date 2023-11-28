package com.example.CampusConnect.Services;

import com.example.CampusConnect.Entities.CCuser;
import com.example.CampusConnect.Repositories.CCuserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {

    private final CCuserRepository userRepository;
    //private final PasswordEncoder passwordEncoder;
    private final EmailService emailService; // This should be your email service class that actually sends the emails

    @Autowired
    public UserService(CCuserRepository userRepository/*, PasswordEncoder passwordEncoder*/, EmailService emailService) {
        this.userRepository = userRepository;
        //this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    // Register a new user
    public void registerUser(CCuser user) {
        // Encrypt the password
        //user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Set the verification token
        user.generateNewVerificationToken();

        // Save the user to the database
        userRepository.save(user);

        // Send verification email
        String verificationUrl = "http://yourdomain.com/user/verify?token=" + user.getVerificationToken();
        emailService.sendVerificationEmail(user.getEmail(), verificationUrl);
    }

    // Verify the user
    public boolean verifyUser(String token) {
        CCuser user = userRepository.findByVerificationToken(token);

        if (user != null && !user.isEmailVerified()) {
            user.verifyEmail();
            userRepository.save(user);
            return true;
        }

        return false;
    }

    // Additional methods like loginUser, updateUser, deleteUser can be added here
}
