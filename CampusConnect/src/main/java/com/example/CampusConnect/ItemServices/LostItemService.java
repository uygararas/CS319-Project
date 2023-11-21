package com.example.CampusConnect.ItemServices;

import com.example.CampusConnect.ItemRepos.LostItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LostItemService {
    @Autowired
    public LostItemRepository lostItemRepo;
}
