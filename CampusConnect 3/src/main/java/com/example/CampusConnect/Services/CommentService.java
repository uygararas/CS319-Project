package com.example.CampusConnect.Services;

import com.example.CampusConnect.DTO.CommentDTO;
import com.example.CampusConnect.DTO.ItemDTO;
import com.example.CampusConnect.Entities.Comment;
import com.example.CampusConnect.Repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

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
}
