package com.example.CampusConnect.Repositories;

import com.example.CampusConnect.Entities.ChatSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatSessionRepository extends JpaRepository<ChatSession, Long> {
    List<ChatSession> findByUser1IdOrUser2Id(String user1Id, String user2Id);
}
