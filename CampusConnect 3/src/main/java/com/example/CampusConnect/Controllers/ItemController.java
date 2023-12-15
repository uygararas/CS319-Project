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

    @Autowired
    public ItemController(ItemService itemService, UserService userService) {
        this.itemService = itemService;
        this.userService = userService;
    }

    /*@PostMapping("/create")
    public ResponseEntity<Item> createItem(@RequestParam Long userId, @RequestBody Item Item) {
        Item createdItem = itemService.createAndSaveItem(userId, Item);
        return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
    }*/

    /*@PostMapping("/items")
    public ResponseEntity<Item> createItem(@RequestBody Item Item) {
        Item createdItem = itemService.createAndSaveItem(Item);
        return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
    }*/

    @PostMapping(value = "/items", consumes = {"multipart/form-data"})
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
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        Item item = itemService.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));

        itemService.delete(item);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/items/{itemId}", consumes = {"multipart/form-data"})
    public ResponseEntity<Item> updateItem(@PathVariable Long itemId,
                                           @RequestParam("item") String itemJson,
                                           @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ItemDTO updatedItemDTO = objectMapper.readValue(itemJson, ItemDTO.class);

            Item savedItem = itemService.updateAndSaveItem(itemId, updatedItemDTO, image);

            return new ResponseEntity<>(savedItem, HttpStatus.OK);
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

    @GetMapping("/items")
    public ResponseEntity<List<ItemDTO>> getItemsByCategory(@RequestParam(required = false) String category) {
        List<ItemDTO> itemDTOs;
        if (category != null && !category.isEmpty()) {
            itemDTOs = itemService.findByType(category); // Make sure this method also returns List<ItemDTO>
        } else {
            itemDTOs = itemService.findAllItemsSorted();
        }
        return ResponseEntity.ok(itemDTOs);
    }

    /*
    @PutMapping("/items/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item itemDetails) {
        Item existingItem = itemService.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));

        // Update properties of the existing item
        existingItem.setTitle(itemDetails.getTitle());
        existingItem.setDescription(itemDetails.getDescription());
        // ... other properties to update

        Item updatedItem = itemService.createAndSaveItem(existingItem);
        return new ResponseEntity<>(updatedItem, HttpStatus.OK);
    }
*/
    // Other endpoints...
}