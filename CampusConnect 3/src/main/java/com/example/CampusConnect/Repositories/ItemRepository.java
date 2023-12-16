package com.example.CampusConnect.Repositories;


import com.example.CampusConnect.Entities.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ItemRepository  extends JpaRepository<Item,Long> {
    List<Item> findAllByOrderByCreatedAtDesc();
    List<Item> findByCategory(String category);
    List<Item> findByUserUserIdAndIsGivenFalse(Long userId);
    List<Item> findByUserUserIdAndIsGivenTrue(Long userId);
    List<Item> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description);
}