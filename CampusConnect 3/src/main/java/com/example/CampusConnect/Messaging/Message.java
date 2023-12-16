package com.example.CampusConnect.Messaging;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;


@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;
    private String senderId;
    private String recipientId;

    private Long chatSessionId;

    @CreationTimestamp
    private LocalDateTime createdAt;

    // Constructors, getters, and setters
}
