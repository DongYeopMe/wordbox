package com.wordtree.card;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class CardRequest {
    private Long directoryId;
    private String title;
    private String language;
    private String description;
    private List<Item> itemList;
}
