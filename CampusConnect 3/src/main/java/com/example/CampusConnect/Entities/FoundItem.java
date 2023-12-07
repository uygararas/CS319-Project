package com.example.CampusConnect.Entities;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@JsonTypeName("foundItem")
public class FoundItem extends Item{

    private String location;
    private String dateLost;

    public FoundItem() {
        super();
        setCategory("foundItem");
    }
}
