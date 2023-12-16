package com.example.CampusConnect.Services;

import com.example.CampusConnect.Messaging.Message;
import com.example.CampusConnect.Repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    public List<Message> getMessagesByChatSession(Long chatSessionId) {
        return messageRepository.findByChatSessionId(chatSessionId);
    }

    // Other methods...
}
