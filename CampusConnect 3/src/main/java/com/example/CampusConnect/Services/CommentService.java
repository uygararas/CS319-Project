package com.example.CampusConnect.Services;

import com.example.CampusConnect.DTO.CommentDTO;
import com.example.CampusConnect.Entities.Comment;
import com.example.CampusConnect.Repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }
    public List<CommentDTO> getCommentsByProductId(Long productId) {
        List<Comment> comments = commentRepository.findByItemItemId(productId);
        // Fetch comments by productId
        return comments.stream()
                .map(CommentDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public void deleteCommentById(Long commentId) {
        try {
            // Check if the comment exists
            if (commentRepository.existsById(commentId)) {
                // Delete the comment by ID
                commentRepository.deleteById(commentId);
            } else {
                throw new RuntimeException("Comment not found with id: " + commentId);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error deleting comment: " + e.getMessage());
        }
    }
}
