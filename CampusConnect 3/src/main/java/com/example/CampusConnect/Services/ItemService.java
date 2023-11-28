package com.example.CampusConnect.Services;

import com.example.CampusConnect.Entities.Item;
import com.example.CampusConnect.Repositories.CCuserRepository;
import com.example.CampusConnect.Repositories.ItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final CCuserRepository userRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository, CCuserRepository userRepository) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }

    /*@Transactional
    public Item createAndSaveItem(Long userId, Item item) {
        CCuser user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        item.setUser(user);

        return itemRepository.save(item);
    }*/

    @Transactional
    public Item createAndSaveItem(Item item) {
        return itemRepository.save(item);
    }

    public Optional<Item> findById(Long id) {
        return itemRepository.findById(id);
    }

    public void delete(Item item) {
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
}
