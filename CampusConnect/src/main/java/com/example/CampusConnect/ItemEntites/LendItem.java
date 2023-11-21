package com.example.CampusConnect.ItemEntites;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class LendItem extends Item{

    private Integer duration;
    private String condition;
}
