package com.wordtree.word.dto;

import com.wordtree.card.Card;
import com.wordtree.card.Language;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class WordRequest {

    private String title;
    private String meaning;
    private String example;
    private Language language;
    private List<Card> cardList;
}
