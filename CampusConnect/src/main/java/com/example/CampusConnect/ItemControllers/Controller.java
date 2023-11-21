package com.example.CampusConnect.ItemControllers;

import com.example.CampusConnect.ItemServices.ItemService;
import com.example.CampusConnect.ItemEntites.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class Controller {

    @Autowired
    private ItemService itemService;

    @GetMapping("/api/Items")
    public ResponseEntity<?> fetchAllItems (){
        Iterable<Item> items = itemService.fetchAllItems();
        return ResponseEntity.ok(items);
    }


}
