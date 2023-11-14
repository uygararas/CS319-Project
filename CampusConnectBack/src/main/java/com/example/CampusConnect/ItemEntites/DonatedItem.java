package com.example.CampusConnect.ItemEntites;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class DonatedItem extends Item{

    private String condition;
}
