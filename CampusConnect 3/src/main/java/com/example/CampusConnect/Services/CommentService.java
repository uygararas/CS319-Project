package com.example.CampusConnect.Services;

import com.example.CampusConnect.Entities.Comment;
import com.example.CampusConnect.Repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }
    public List<Comment> getCommentsByProductId(Long productId) {
        return commentRepository.findByItemItemId(productId);
    }
}
