package com.example.CampusConnect.ItemServices;

import com.example.CampusConnect.ItemRepos.FoundItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FoundItemService {

    @Autowired
    public FoundItemRepository foundItemRepo;
}
