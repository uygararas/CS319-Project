package com.example.CampusConnect.Entites;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@JsonTypeName("donatedItem")
public class DonatedItem extends Item{

    private String condition;
}
