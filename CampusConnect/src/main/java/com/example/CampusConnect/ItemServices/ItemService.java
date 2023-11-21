package com.example.CampusConnect.ItemServices;

import com.example.CampusConnect.ItemEntites.Item;
import com.example.CampusConnect.ItemRepos.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class ItemService {

    @Autowired
    public ItemRepository itemRepo;

    public Iterable<Item> fetchAllItems() {
        return itemRepo.findAll();
    }



    public Item createItem() {
        Item item = new Item();
        item.setTitle("zort");
        item.setDescription("zattirizartzort");
        item.setUserID(1);
        item.setGiven(false);
        item.setCategory("OSRK");
        return item;
    }

    public boolean deleteItem(Integer id) {
        if (itemRepo.existsById(id)) {
            itemRepo.deleteById(id);
            return true;
        }
        return false;
    }


}
