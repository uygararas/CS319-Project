package com.example.CampusConnect.Services;

import com.example.CampusConnect.Entities.Item;
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

    /*@Transactional
    public Item createAndSaveItem(Long userId, Item item) {
        CCuser user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        item.setUser(user);

        return itemRepository.save(item);
    }*/

    @Transactional
    public Item createAndSaveItem(Item item, MultipartFile image) {
        try {
            if (image != null && !image.isEmpty()) {
                String imageUrl = storageService.uploadFile(image);
                item.setImageUrl(imageUrl);
            }

            return itemRepository.save(item);
        } catch (Exception e) {
            throw new RuntimeException("Error while saving item", e);
        }
    }

    public Optional<Item> findById(Long id) {
        return itemRepository.findById(id);
    }

    public void delete(Item item) {

        String imageUrl = item.getImageUrl();
        String fileKey = extractFileKeyFromUrl(imageUrl);

        // Deleting the file from S3 using StorageService
        if (fileKey != null && !fileKey.isEmpty()) {
            storageService.deleteFile(fileKey);
        }

        // Deleting the item from the database
        itemRepository.delete(item);
    }

    public List<Item> findAll() {
        return itemRepository.findAll();
    }

    public List<Item> findAllItemsSorted() {
        return itemRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Item> findByType(String category) {
        return itemRepository.findByCategory(category);
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
}
