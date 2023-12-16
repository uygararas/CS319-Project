package com.example.CampusConnect.Controllers;

import com.example.CampusConnect.Messaging.Message;
import com.example.CampusConnect.Services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @PostMapping
    public Message sendMessage(@RequestBody Message message) {
        return messageService.saveMessage(message);
    }

    @GetMapping("/{chatSessionId}")
    public List<Message> getMessagesByChatSession(@PathVariable Long chatSessionId) {
        return messageService.getMessagesByChatSession(chatSessionId);
    }

    // Other endpoints...
}
