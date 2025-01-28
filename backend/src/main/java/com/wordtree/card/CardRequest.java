package com.wordtree.card;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CardRequest {
    private String title;
    private Language language;
}
