package com.example.CampusConnect.Services;

import com.example.CampusConnect.Messaging.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketService {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public WebSocketService(SimpMessagingTemplate messagingTemplate){
        this.messagingTemplate = messagingTemplate;
    }

    public void notifyFrontend(final String message){
        ResponseMessage response = new ResponseMessage(message);

        messagingTemplate.convertAndSend("/topic/messages",response);
    }
}
