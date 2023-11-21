package com.example.CampusConnect.ItemRepos;


import com.example.CampusConnect.ItemEntites.Item;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ItemRepository  extends JpaRepository<Item,Integer> {
}