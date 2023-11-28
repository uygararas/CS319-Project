package com.example.CampusConnect.Entities;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@JsonTypeName("lendItem")
public class LendItem extends Item{

    private String duration;
    private String condition;

    public LendItem() {
        super();
        setCategory("lendItem");
    }
}
