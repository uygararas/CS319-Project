package com.example.CampusConnect.ItemRepos;

import com.example.CampusConnect.ItemEntites.LostItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LostItemRepository  extends JpaRepository<LostItem,Integer> {
}
