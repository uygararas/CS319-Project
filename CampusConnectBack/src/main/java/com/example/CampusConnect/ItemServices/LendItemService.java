package com.example.CampusConnect.ItemServices;

import com.example.CampusConnect.ItemRepos.LendItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LendItemService {
    @Autowired
    public LendItemRepository lendItemRepo;
}
