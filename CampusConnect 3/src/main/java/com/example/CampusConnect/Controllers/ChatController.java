package com.example.CampusConnect.Controllers;

import com.example.CampusConnect.Entities.ChatSession;
import com.example.CampusConnect.Services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @GetMapping("/chats")
    public ResponseEntity<List<ChatSession>> getChats(Principal principal) {
        String userId = principal.getName();
        List<ChatSession> chats = chatService.getChats(userId);
        return ResponseEntity.ok(chats);
    }
}
