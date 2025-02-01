package com.wordtree.card;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Language {
    TOTAL("전체"),
    JAPANESE("일본어"),
    ENGLISH("영어");

    private final String desc;

}
