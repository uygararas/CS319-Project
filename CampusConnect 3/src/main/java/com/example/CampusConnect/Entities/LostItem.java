package com.example.CampusConnect.Entities;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@JsonTypeName("lostItem")
public class LostItem extends Item{

    private String location;
    private String dateLost;

    public LostItem() {
        super();
        setCategory("lostItem");
    }
}
