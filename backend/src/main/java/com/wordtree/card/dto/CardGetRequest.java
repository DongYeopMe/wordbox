package com.wordtree.card.dto;

import com.wordtree.card.entity.Language;
import lombok.Getter;

@Getter
public class CardGetRequest {
    private Long directoryId;
    private String title;
}
