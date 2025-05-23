package com.wordtree.card.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GetCardResponse {
    private Long cardId;
    private String title;
    private int count;
    private String username;
    private String directoryTitle;
    private boolean isMe;
    
}
