package com.example.CampusConnect.ItemServices;

import com.example.CampusConnect.ItemEntites.LendItem;
import com.example.CampusConnect.ItemRepos.LendItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class LendItemService {
    public interface LendItemRepository extends JpaRepository<LendItem, Integer> {
    }
}
