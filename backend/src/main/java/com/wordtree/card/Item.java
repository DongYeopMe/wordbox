package com.wordtree.card;

import jakarta.persistence.Embeddable;

import lombok.Getter;
@Embeddable
@Getter
public class Item {
    private String word;
    private String meaning;
    private String example;
    private boolean starred;

    public Item(String word, String meaning, String example) {
        this.word = word;
        this.meaning = meaning;
        this.example = example;
        this.starred = false;
    }
}

