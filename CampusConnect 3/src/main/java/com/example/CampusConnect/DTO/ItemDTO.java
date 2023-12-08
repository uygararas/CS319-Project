package com.example.CampusConnect.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.example.CampusConnect.Entities.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemDTO {

    private Long itemId;
    private String title;
    private String description;
    private boolean isGiven;
    private String imageUrl;
    private String category;
    private Long userId; // ID of the user associated with the item
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private String condition;
    private String location;
    private String dateLost;
    private String duration;
    private BigDecimal price;

    public static ItemDTO fromEntity(Item item) {
        ItemDTO dto = new ItemDTO();

        Long userId = null;
        if (item.getUser() != null) {
            userId = item.getUser().getUserId();
        }
        dto.setUserId(userId);
        dto.setItemId(item.getItemId());
        dto.setTitle(item.getTitle());
        dto.setDescription(item.getDescription());
        dto.setGiven(item.isGiven());
        dto.setImageUrl(item.getImageUrl());
        dto.setCategory(item.getCategory());
        dto.setCreatedAt(item.getCreatedAt());
        dto.setUpdatedAt(item.getUpdatedAt());

        // Handle optional fields
        if (item instanceof SecondHandItem secondHandItem) {
            dto.setCondition(secondHandItem.getCondition());
            dto.setPrice(((SecondHandItem) item).getPrice());
        }
        else if (item instanceof LostItem lostItem) {
            dto.setLocation(lostItem.getLocation());
            dto.setDateLost(lostItem.getDateLost());
        }
        else if (item instanceof FoundItem foundItem) {
            dto.setLocation(foundItem.getLocation());
            dto.setDateLost(foundItem.getDateLost());
        }
        else if (item instanceof DonatedItem donatedItem) {
            dto.setCondition(donatedItem.getCondition());
        }
        else if (item instanceof LendItem lendItem) {
            dto.setCondition(lendItem.getCondition());
            dto.setDuration(lendItem.getDuration());
        }
        else if (item instanceof RentedItem rentedItem) {
            dto.setCondition(rentedItem.getCondition());
            dto.setPrice(rentedItem.getPrice());
            dto.setDuration(rentedItem.getDuration());
        }

        return dto;
    }
}