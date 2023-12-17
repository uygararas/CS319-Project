package com.example.CampusConnect.Services;

import com.example.CampusConnect.DTO.ItemDTO;
import com.example.CampusConnect.Entities.*;
import com.example.CampusConnect.Repositories.CCuserRepository;
import com.example.CampusConnect.Repositories.ItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final CCuserRepository userRepository;
    private final StorageService storageService;

    @Autowired
    public ItemService(ItemRepository itemRepository, CCuserRepository userRepository, StorageService storageService) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
        this.storageService = storageService;
    }

    @Transactional
    public ItemDTO createAndSaveItem(Item item, MultipartFile image) {
        try {
            if (image != null && !image.isEmpty()) {
                String imageUrl = storageService.uploadFile(image);
                item.setImageUrl(imageUrl);
            }

            Item savedItem = itemRepository.save(item);
            return ItemDTO.fromEntity(savedItem); // Convert saved item to DTO
        } catch (Exception e) {
            throw new RuntimeException("Error while saving item", e);
        }
    }

    public List<ItemDTO> findItemsByUserAndIsGivenFalse(Long userId) {
        List<Item> items = itemRepository.findByUserUserIdAndIsGivenFalse(userId);;
        return items.stream()
                .map(ItemDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public Item updateAndSaveItem(Long itemId, ItemDTO updatedItemDTO, MultipartFile image) throws Exception {
        Item existingItem = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + itemId));

        // Update the existing item with values from the DTO
        updatedItemDTO.updateEntity(existingItem);
        // Process and set the image if provided
        if (image != null && !image.isEmpty()) {
            String imageUrl = storageService.uploadFile(image);
            existingItem.setImageUrl(imageUrl);
        }

        return itemRepository.save(existingItem);
    }

    public List<ItemDTO> searchItems(String query, Long userId) {
        String standardizedQuery = query.toLowerCase(); // or toUpperCase()
        List<Item> items = itemRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(standardizedQuery, standardizedQuery);

        return items.stream()
                .filter(item -> !item.getUser().getUserId().equals(userId)) // Assuming getUser() returns the User object
                .map(ItemDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<ItemDTO> findItemsByUserAndIsGivenTrue(Long userId) {
        List<Item> items = itemRepository.findByUserUserIdAndIsGivenTrue(userId);;
        return items.stream()
                .map(ItemDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public Optional<Item> findById(Long id) {
        return itemRepository.findById(id);
    }

    public Item toggleIsGiven(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + itemId));

        item.setIsGiven(!item.isGiven()); // Toggle the isGiven attribute
        return itemRepository.save(item); // Save the updated item
    }

    public void delete(Item item) {
        // Deleting the item from the database
        itemRepository.delete(item);
    }

    public List<ItemDTO> findAllItemsSorted(Long userId) {
        List<Item> items = itemRepository.findAllByOrderByCreatedAtDesc();
        return items.stream()
                .filter(item -> !item.getUser().getUserId().equals(userId)) // Assuming getUser() returns the User object associated with the item
                .map(ItemDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<ItemDTO> findByTypeAndNotUserId(String category, Long userId) {
        List<Item> items = itemRepository.findByCategory(category);
        return items.stream()
                .filter(item -> !item.getUser().getUserId().equals(userId)) // Same assumption as above
                .map(ItemDTO::fromEntity)
                .collect(Collectors.toList());
    }

    private String extractFileKeyFromUrl(String imageUrl) {
        if (imageUrl != null && !imageUrl.isEmpty()) {
            try {
                URL url = new URL(imageUrl);
                // Assumes the file key is the part of the path after the bucket name
                return url.getPath().substring(1); // Remove the leading '/'
            } catch (MalformedURLException e) {
                throw new RuntimeException("Invalid image URL", e);
            }
        }
        return null;
    }
    public Item getItemById(Long itemId) {
        return itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + itemId));
    }
}