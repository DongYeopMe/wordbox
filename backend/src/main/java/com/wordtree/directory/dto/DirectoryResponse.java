package com.wordtree.directory.dto;

import com.wordtree.card.entity.Card;
import lombok.AllArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Setter
public class DirectoryResponse {
    private String title;
    private int count;
    private List<Card> cardList;
}
