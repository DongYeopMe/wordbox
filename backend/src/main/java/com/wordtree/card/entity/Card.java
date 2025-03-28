package com.wordtree.card.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.wordtree.card.dto.CardRequest;
import com.wordtree.directory.Directory;
import com.wordtree.member.Member;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="cards")
public class Card {
    @Id
    @Column(name = "card_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="card_title",nullable = false)
    private String title;

    @Column(name="card_count",nullable = false)
    private int count;

    @Column(name="card_language",nullable = false)
    private String language;

    @Column(name="card_color",nullable = false)
    private String description;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "card_items", joinColumns = @JoinColumn(name = "card_id"))
    private List<Item> itemList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member owner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "directory_id")
    @JsonIgnore
    private Directory directory;
    @Builder
    public Card(String title, int count, String language,String description, List<Item> itemList) {
        this.title = title;
        this.count = count;
        this.language = language;
        this.description = description;
        this.itemList = itemList;
    }
    public static Card requestConvert(CardRequest cardRequest){
        return Card.builder()
                .title(cardRequest.getTitle())
                .count(cardRequest.getItemList().size())
                .language(cardRequest.getLanguage())
                .description(cardRequest.getDescription())
                .itemList(cardRequest.getItemList())
                .build();
    }
}
