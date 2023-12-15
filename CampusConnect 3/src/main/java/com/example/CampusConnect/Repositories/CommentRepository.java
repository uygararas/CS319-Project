package com.example.CampusConnect.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.CampusConnect.Entities.Comment;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByProductId(Long productId);
}
