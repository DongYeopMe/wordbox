package com.wordtree.card;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Language {
    TOTAL("전체"),
    JAPANESE("日本語"),
    ENGLISH("ENGLISH");

    private final String desc;

}
