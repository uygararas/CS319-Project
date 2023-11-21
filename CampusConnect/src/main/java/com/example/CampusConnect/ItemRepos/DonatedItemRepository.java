package com.example.CampusConnect.ItemRepos;

import com.example.CampusConnect.ItemEntites.DonatedItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonatedItemRepository extends JpaRepository<DonatedItem,Integer> {
}
