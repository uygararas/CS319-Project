package com.example.CampusConnect.Entites;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID; // Import for generating unique verification token

@Getter
@Setter
@Entity
@Table(name = "CCusers")
public class CCuser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Item> items = new ArrayList<>();

    // New field to store verification token
    private String verificationToken;

    // New field to store email verification status
    private boolean isEmailVerified;

    public CCuser(String email, String password) {
        this.email = email;
        this.password = password;
        this.isEmailVerified = false; // Default to false until email is verified
        this.verificationToken = UUID.randomUUID().toString(); // Generate unique token
    }

    public CCuser() {
        // No-args constructor
    }

    // You already have setter methods generated by Lombok for setting the password and email

    // Method to generate a new verification token
    public void generateNewVerificationToken() {
        this.verificationToken = UUID.randomUUID().toString();
    }

    // Method to verify the user's email
    public void verifyEmail() {
        this.isEmailVerified = true;
    }

    // Getters and setters will be handled by Lombok
}
