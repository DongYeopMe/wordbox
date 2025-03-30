package com.wordtree.card.entity;

import jakarta.persistence.Embeddable;

import lombok.Getter;

import java.util.Objects;

@Embeddable
@Getter
public class Item {
    private String word;
    private String meaning;
    private String example;
    private String exampleMeaning;
    private boolean starred;

    public Item(String word, String meaning, String example, String exampleMeaning, boolean starred) {
        this.word = word;
        this.meaning = meaning;
        this.example = example;
        this.exampleMeaning = exampleMeaning;
        this.starred = false;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;  // 자기 자신과 비교하는 경우 → 무조건 true

        if (!(o instanceof Item)) return false;
        // 타입이 Item이 아니면 비교 불가 → false

        Item item = (Item) o;
        // 다운캐스팅해서 실제 필드들 비교

        return Objects.equals(word, item.word)
                && Objects.equals(meaning, item.meaning)
                && Objects.equals(example, item.example)
                && Objects.equals(exampleMeaning, item.exampleMeaning);
    }
    @Override
    public int hashCode() {
        return Objects.hash(word, meaning, example, exampleMeaning);
    }

}

