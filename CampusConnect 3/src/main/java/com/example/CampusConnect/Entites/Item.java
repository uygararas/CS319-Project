package com.example.CampusConnect.Entites;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo.Id;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.JOINED) // This annotation specifies the inheritance strategy
@Table(name = "all_items")
@JsonTypeInfo(use = Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @Type(value = SecondHandItem.class, name = "secondHandItem"),
        @Type(value = RentedItem.class, name = "rentedItem"),
        @Type(value = LostItem.class, name = "lostItem"),
        @Type(value = LendItem.class, name = "lendItem"),
        @Type(value = FoundItem.class, name = "foundItem"),
        @Type(value = DonatedItem.class, name = "donatedItem"),
})
public abstract class Item {

    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;
    private String title;
    private String description;
    private boolean isGiven = false;
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private CCuser user;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Item (String title) {
        this.title = title;
    }

    public Item() {

    }
}