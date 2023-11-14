package com.example.CampusConnect.ItemEntites;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class FoundItem extends Item{

    private String location;
    private String timeLost;
    private String dateLost;
}
