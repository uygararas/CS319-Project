package com.example.CampusConnect.Entities;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@JsonTypeName("rentedItem")
public class RentedItem extends Item{

    private String duration;
    private String condition;
    private BigDecimal price;

    public RentedItem() {
        super();
        setCategory("rentedItem");
    }
}
