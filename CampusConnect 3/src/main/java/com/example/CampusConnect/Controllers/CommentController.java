package com.example.CampusConnect.Controllers;

import com.example.CampusConnect.DTO.CommentDTO;
import com.example.CampusConnect.Entities.CCuser;
import com.example.CampusConnect.Entities.Comment;
import com.example.CampusConnect.Entities.Item;
import com.example.CampusConnect.Services.CommentService;
import com.example.CampusConnect.Services.ItemService;
import com.example.CampusConnect.Services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CommentController {

    private final CommentService commentService;
    private final ItemService itemService;
    private final UserService ccuserService;

    public CommentController(CommentService commentService,ItemService itemService, UserService ccuserService) {
        this.commentService = commentService;
        this.itemService = itemService;
        this.ccuserService = ccuserService;
    }

    @PostMapping("/post/{itemId}/{userId}")
    public ResponseEntity<CommentDTO> addComment(@PathVariable Long itemId,
                                                 @PathVariable Long userId,
                                                 @RequestBody CommentDTO commentDTO) {
        // Fetch the item and user based on the provided IDs
        Item item = itemService.getItemById(itemId);
        CCuser user = ccuserService.findById(userId);

        // Create and populate a new Comment entity
        Comment comment = new Comment();
        comment.setText(commentDTO.getText());
        comment.setItem(item);
        comment.setUser(user);

        // Save the comment and convert the saved entity back to DTO
        CommentDTO savedCommentDTO = CommentDTO.fromEntity(commentService.saveComment(comment));

        return new ResponseEntity<>(savedCommentDTO, HttpStatus.CREATED);
    }
    @GetMapping("/comments/{productId}")
    public List<CommentDTO> getCommentsByProduct(@PathVariable Long productId) {
        // Fetch comments by productId
        List<CommentDTO> commentDTOs = commentService.getCommentsByProductId(productId);

        return ResponseEntity.ok(commentDTOs).getBody();
    }

    @DeleteMapping("/comments/delete/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId) {
        try {
            // Call the service to delete the comment
            commentService.deleteCommentById(commentId);
            // Return a success response
            return ResponseEntity.ok().body("Comment deleted successfully");
        } catch (Exception e) {
            // If something goes wrong, return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting comment: " + e.getMessage());
        }
    }
}