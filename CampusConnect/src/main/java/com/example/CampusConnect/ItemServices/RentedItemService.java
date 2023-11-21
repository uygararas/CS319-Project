package com.example.CampusConnect.ItemServices;

import com.example.CampusConnect.ItemRepos.RentedItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RentedItemService {
    @Autowired
    public RentedItemRepository rentedItemRepo;
}
