package com.example.CampusConnect.ItemServices;

import com.example.CampusConnect.ItemRepos.DonatedItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DonatedItemService {

    @Autowired
    public DonatedItemRepository donatedItemRepo;
}
