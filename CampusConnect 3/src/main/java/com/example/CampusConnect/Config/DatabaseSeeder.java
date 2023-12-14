package com.example.CampusConnect.Config;

import com.example.CampusConnect.DTO.ItemDTO;
import com.example.CampusConnect.Entities.CCuser;
import com.example.CampusConnect.Entities.Item;
import com.example.CampusConnect.Entities.SecondHandItem;
import com.example.CampusConnect.Services.ItemService;
import com.example.CampusConnect.Services.UserService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import java.io.InputStream;
import com.example.CampusConnect.Repositories.CCuserRepository;
import com.example.CampusConnect.Repositories.ItemRepository;

import java.util.List;

@Component
public class DatabaseSeeder {

    private final ObjectMapper objectMapper;
    private final ItemRepository itemRepository;
    private final CCuserRepository ccuserRepository;

    public DatabaseSeeder(ObjectMapper objectMapper, ItemService itemService, ItemRepository itemRepository, CCuserRepository ccuserRepository) {
        this.objectMapper = objectMapper;
        this.itemRepository = itemRepository;
        this.ccuserRepository = ccuserRepository;
    }

    @Bean
    public CommandLineRunner seedDatabase() {
        return args -> {
            seedCCusers();
            seedItems();
            // Call other seed methods...
        };
    }

    private void seedCCusers() throws Exception {
        InputStream resource = new ClassPathResource("ccusers.json").getInputStream();
        List<CCuser> users = objectMapper.readValue(resource, new TypeReference<List<CCuser>>() {});
        ccuserRepository.saveAll(users);
    }
    public void seedItems() throws Exception {
        InputStream inputStream = new ClassPathResource("items.json").getInputStream();
        List<Item> items = objectMapper.readValue(inputStream, new TypeReference<List<Item>>() {});

        items.forEach(item -> {
            ccuserRepository.findById(item.getUserId()).ifPresent(item::setUser);
            itemRepository.save(item);
        });
    }
}

