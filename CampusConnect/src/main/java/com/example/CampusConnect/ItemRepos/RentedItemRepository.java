package com.example.CampusConnect.ItemRepos;

import com.example.CampusConnect.ItemEntites.RentedItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentedItemRepository  extends JpaRepository<RentedItem,Integer> {
}
