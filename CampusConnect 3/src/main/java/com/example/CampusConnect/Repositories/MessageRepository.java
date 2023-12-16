package com.example.CampusConnect.Repositories;

import com.example.CampusConnect.Messaging.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByChatSessionId(Long chatSessionId);
}
