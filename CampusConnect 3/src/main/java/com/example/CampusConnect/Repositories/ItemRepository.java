package com.example.CampusConnect.Repositories;


import com.example.CampusConnect.Entites.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository  extends JpaRepository<Item,Long> {
    List<Item> findAllByOrderByCreatedAtDesc();
}