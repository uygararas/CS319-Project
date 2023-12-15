package com.example.CampusConnect.Entities;
import jakarta.persistence.*;

@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;
    private Long productId; // Assuming this is the ID of the product

    // Constructors, getters, and setters
}
