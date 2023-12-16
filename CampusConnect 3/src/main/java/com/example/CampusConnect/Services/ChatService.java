package com.example.CampusConnect.Services;

import com.example.CampusConnect.Entities.ChatSession;
import com.example.CampusConnect.Repositories.ChatSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {
    @Autowired
    private ChatSessionRepository chatSessionRepository;

    public List<ChatSession> getChats(String userId) {
        return chatSessionRepository.findByUser1IdOrUser2Id(userId, userId);
    }

}
