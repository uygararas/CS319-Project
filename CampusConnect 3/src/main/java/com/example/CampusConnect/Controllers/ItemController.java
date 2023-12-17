package com.example.CampusConnect.Controllers;

import com.example.CampusConnect.DTO.ItemDTO;
import com.example.CampusConnect.Entities.CCuser;
import com.example.CampusConnect.Services.ItemService;
import com.example.CampusConnect.Entities.Item;
import com.example.CampusConnect.Services.StorageService;
import com.example.CampusConnect.Services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
//@RequestMapping("/items")
@CrossOrigin(origins = "http://localhost:5173")
public class ItemController {

    private final ItemService itemService;
    private final UserService userService;

    @GetMapping("/items/search/{userId}")
    public ResponseEntity<List<ItemDTO>> searchItems(
            @PathVariable Long userId,
            @RequestParam String q) {

        List<ItemDTO> itemDTOs = itemService.searchItems(q, userId);
        return ResponseEntity.ok(itemDTOs);
    }

    @Autowired
    public ItemController(ItemService itemService, UserService userService) {
        this.itemService = itemService;
        this.userService = userService;
    }

    /*@PostMapping(value = "/items", consumes = {"multipart/form-data"})
    public ResponseEntity<Item> createItem(@RequestParam("item") String itemJson,
                                           @RequestParam("image") MultipartFile image,
                                           @RequestParam("userId") Long userId) {
        try {
            // Convert JSON string to Item object
            ObjectMapper objectMapper = new ObjectMapper();
            Item item = objectMapper.readValue(itemJson, Item.class);

            // Find the user by userId
            userService.addItemToUser(item, userId);

            // Create and save the item with the image
            Item createdItem = itemService.createAndSaveItem(item, image);

            return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
        } catch (Exception e) {
            // Handle exceptions
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }*/
    @PostMapping(value = "/items", consumes = {"multipart/form-data"})
    public ResponseEntity<ItemDTO> createItem(@RequestParam("item") String itemJson,
                                              @RequestParam("image") MultipartFile image,
                                              @RequestParam("userId") Long userId) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Item item = objectMapper.readValue(itemJson, Item.class);

            // Find the user by userId and add item to user
            userService.addItemToUser(item, userId);

            // Create and save the item with the image
            ItemDTO createdItemDTO = itemService.createAndSaveItem(item, image);

            return new ResponseEntity<>(createdItemDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            // Handle exceptions
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        Item item = itemService.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));

        itemService.delete(item);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/items/{itemId}", consumes = {"multipart/form-data"})
    public ResponseEntity<ItemDTO> updateItem(@PathVariable Long itemId,
                                           @RequestParam("item") String itemJson,
                                           @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ItemDTO updatedItemDTO = objectMapper.readValue(itemJson, ItemDTO.class);

            Item savedItem = itemService.updateAndSaveItem(itemId, updatedItemDTO, image);

            // Convert the saved Item entity to ItemDTO
            ItemDTO responseDTO = ItemDTO.fromEntity(savedItem);
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/items/active-posts/{userId}")
    public ResponseEntity<List<ItemDTO>> getItemsByUserAndIsGivenFalse(@PathVariable Long userId) {
        List<ItemDTO> itemDTOs = itemService.findItemsByUserAndIsGivenFalse(userId);
        return ResponseEntity.ok(itemDTOs);
    }
    @GetMapping("/items/old-posts/{userId}")
    public ResponseEntity<List<ItemDTO>> getItemsByUserAndIsGivenTrue(@PathVariable Long userId) {
        List<ItemDTO> itemDTOs = itemService.findItemsByUserAndIsGivenTrue(userId);
        return ResponseEntity.ok(itemDTOs);
    }

    @PutMapping("/{itemId}/toggle-given")
    public ResponseEntity<ItemDTO> toggleItemIsGiven(@PathVariable Long itemId) {
        Item updatedItem = itemService.toggleIsGiven(itemId);
        ItemDTO itemDTO = ItemDTO.fromEntity(updatedItem);
        return new ResponseEntity<>(itemDTO, HttpStatus.OK);
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<ItemDTO> getItemById(@PathVariable Long id) {
        Item item = itemService.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));

        ItemDTO itemDTO = ItemDTO.fromEntity(item);

        return new ResponseEntity<>(itemDTO, HttpStatus.OK);
    }
    @GetMapping("/items/get/{userId}")
    public ResponseEntity<List<ItemDTO>> getItemsByCategoryAndNotUserId(
            @PathVariable Long userId,
            @RequestParam(required = false) String category) {

        List<ItemDTO> itemDTOs;
        if (category != null && !category.isEmpty()) {
            itemDTOs = itemService.findByTypeAndNotUserId(category, userId); // Updated method name
        } else {
            itemDTOs = itemService.findAllItemsSorted(userId);
        }
        return ResponseEntity.ok(itemDTOs);
    }
}