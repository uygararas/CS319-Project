package com.example.CampusConnect.Controllers;

import com.example.CampusConnect.Services.ItemService;
import com.example.CampusConnect.Entities.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@RequestMapping("/items")
@CrossOrigin(origins = "http://localhost:5173")
public class ItemController {

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    /*@PostMapping("/create")
    public ResponseEntity<Item> createItem(@RequestParam Long userId, @RequestBody Item Item) {
        Item createdItem = itemService.createAndSaveItem(userId, Item);
        return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
    }*/

    @PostMapping("/items")
    public ResponseEntity<Item> createItem(@RequestBody Item Item) {
        Item createdItem = itemService.createAndSaveItem(Item);
        return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        Item item = itemService.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));

        itemService.delete(item);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        Item item = itemService.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));

        return new ResponseEntity<>(item, HttpStatus.OK);
    }
    @GetMapping("/items")
    public ResponseEntity<List<Item>> getItemsByCategory(@RequestParam(required = false) String category) {
        List<Item> items;
        if (category != null && !category.isEmpty()) {
            items = itemService.findByType(category);
        } else {
            items = itemService.findAllItemsSorted(); // Assuming this method returns all items
        }
        return ResponseEntity.ok(items);
    }

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

    // Other endpoints...
}