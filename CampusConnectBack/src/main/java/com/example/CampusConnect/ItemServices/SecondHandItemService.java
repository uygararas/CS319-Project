package com.example.CampusConnect.ItemServices;

import com.example.CampusConnect.ItemRepos.SecondHandItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SecondHandItemService {
    @Autowired
    public SecondHandItemRepository secondHandItemRepo;
}
