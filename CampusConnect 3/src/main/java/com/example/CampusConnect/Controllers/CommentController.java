package com.example.CampusConnect.Controllers;

import com.example.CampusConnect.Entities.Comment;
import com.example.CampusConnect.Services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")


@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping
    public Comment addComment(@RequestBody Comment comment) {
        return commentService.saveComment(comment);
    }

    @GetMapping("/{productId}")
    public List<Comment> getCommentsByProduct(@PathVariable Long productId) {
        return commentService.getCommentsByProductId(productId);
    }
}
