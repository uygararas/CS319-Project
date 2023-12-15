package com.example.CampusConnect.Repositories;

import com.example.CampusConnect.Messaging.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
    // You can add custom methods to fetch messages if needed
}
