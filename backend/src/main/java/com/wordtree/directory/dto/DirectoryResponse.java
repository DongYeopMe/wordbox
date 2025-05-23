package com.wordtree.directory.dto;

import com.wordtree.card.dto.UserCardResponse;
import lombok.AllArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Setter
public class DirectoryResponse {
    private String title;
    private int count;
    private List<UserCardResponse> cardList;
}
