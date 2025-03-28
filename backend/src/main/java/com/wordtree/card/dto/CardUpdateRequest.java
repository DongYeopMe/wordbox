package com.wordtree.card.dto;

import com.wordtree.card.entity.Item;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Getter
public class CardUpdateRequest {
    private String title;
    private String language;
    private String description;
    private List<Item> itemlist;
}
