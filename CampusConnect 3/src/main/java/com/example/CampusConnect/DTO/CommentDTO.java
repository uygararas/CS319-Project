package com.example.CampusConnect.DTO;

import com.example.CampusConnect.Entities.CCuser;
import com.example.CampusConnect.Entities.Comment;
import com.example.CampusConnect.Entities.Item;
import com.example.CampusConnect.Services.ItemService;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CommentDTO {
    // Getters and Setters
    private Long id;
    private String text;
    private Long userId;
    private Long itemId;
    private LocalDateTime createdAt;

    // Injecting ItemService to fetch the correct Item subclass
    private static ItemService itemService;

    // A setter method for ItemService (to be called at initialization)
    public static void setItemService(ItemService service) {
        CommentDTO.itemService = service;
    }

    // Constructors
    public CommentDTO() {
    }
    public CommentDTO(Long id, String text, Long userId, String userName, Long itemId, LocalDateTime createdAt) {
        this.id = id;
        this.text = text;
        this.userId = userId;
        this.itemId = itemId;
        this.createdAt = createdAt;
    }

    // Converts a Comment entity to a CommentDTO
    public static CommentDTO fromEntity(Comment comment) {
        CommentDTO dto = new CommentDTO();
        dto.setId(comment.getId());
        dto.setText(comment.getText());
        dto.setUserId(comment.getUser() != null ? comment.getUser().getUserId() : null);
        dto.setItemId(comment.getItem() != null ? comment.getItem().getUserId() : null);
        dto.setCreatedAt(comment.getCreatedAt());
        return dto;
    }

    // Converts this DTO to a Comment entity
    public Comment toEntity() {
        Comment comment = new Comment();
        comment.setId(this.getId());
        comment.setText(this.getText());

        if (this.getUserId() != null) {
            CCuser user = new CCuser();
            user.setUserId(this.getUserId());
            comment.setUser(user);
        }

        if (this.getItemId() != null && itemService != null) {
            // Fetch the specific item (with the correct subclass) from the database
            Item item = itemService.getItemById(this.getItemId());
            comment.setItem(item);
        }

        // Note: createdAt is set automatically in the entity
        return comment;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
