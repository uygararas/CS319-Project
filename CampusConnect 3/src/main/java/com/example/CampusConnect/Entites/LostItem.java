package com.example.CampusConnect.Entites;

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

}
