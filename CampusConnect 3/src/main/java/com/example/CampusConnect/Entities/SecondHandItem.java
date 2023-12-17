package com.example.CampusConnect.Entities;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonTypeName;

import java.math.BigDecimal;
@Getter
@Setter
@Entity
@JsonTypeName("secondHandItem")
public class SecondHandItem extends Item{

    private String condition;
    private BigDecimal price;

    public SecondHandItem() {
        super(); // Calls the default constructor of Item
        setCategory("secondHandItem");
    }

}
