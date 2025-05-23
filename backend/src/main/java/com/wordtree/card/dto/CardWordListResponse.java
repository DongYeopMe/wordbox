package com.wordtree.card.dto;

import com.wordtree.card.entity.Item;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class CardWordListResponse {
    private List<Item> itemList;
    private boolean isMe;
}
