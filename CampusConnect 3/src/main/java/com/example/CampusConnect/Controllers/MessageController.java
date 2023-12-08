package com.example.CampusConnect.Controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import com.example.CampusConnect.Messaging.ResponseMessage;
import com.example.CampusConnect.Messaging.Message;
import org.springframework.web.util.HtmlUtils;

import java.security.Principal;


@Controller
public class MessageController {
    @MessageMapping("/messages")
    @SendTo("/topic/messages")
    public ResponseMessage getMessage(final Message message) throws InterruptedException{
        Thread.sleep(1000);
        return new ResponseMessage(HtmlUtils.htmlEscape(message.getMessageContents()));
    }

    @MessageMapping("/private-message")
    @SendToUser("/topic/private-messages")
    public ResponseMessage getPrivateMessage(final Message message,
                                             final Principal principal) throws InterruptedException {
        Thread.sleep(1000);
        return new ResponseMessage(HtmlUtils.htmlEscape(
                "Sending private message to user " + principal.getName() + ": "
                        + message.getMessageContents())
        );
    }

}
