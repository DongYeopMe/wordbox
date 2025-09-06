package com.wordtree.card;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.wordtree.member.entity.Member;
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

    @Enumerated(EnumType.STRING)
    @Column(name="card_category",nullable = false)
    private Language language;

    @OneToMany(mappedBy = "card", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<CardWord> cardWords = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @JsonIgnore
    private Member member;

    @Builder
    public Card(String title, int count, Language language) {
        this.title = title;
        this.count = count;
        this.language = language;
    }

    public static Card requestConvert(CardRequest cardRequest){
        return Card.builder()
                .title(cardRequest.getTitle())
                .count(0)
                .language(cardRequest.getLanguage())
                .build();
    }
}
