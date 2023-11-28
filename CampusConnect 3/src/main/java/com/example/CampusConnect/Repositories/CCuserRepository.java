package com.example.CampusConnect.Repositories;

import com.example.CampusConnect.Entities.CCuser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CCuserRepository extends JpaRepository<CCuser, Long> {
    // Method to find a user by the verification token
    CCuser findByVerificationToken(String verificationToken);
}
