package com.wordtree.card.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class UserCardResponse {
    private Long cardId;
    private String title;
    private int count;
    private String username;
    private List<String> DIRTitle;
    private boolean inDIR;
    private boolean isMe;
}
