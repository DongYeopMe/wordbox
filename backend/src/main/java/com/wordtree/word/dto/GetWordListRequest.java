package com.wordtree.word.dto;

import com.wordtree.card.Language;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GetWordListRequest {
    private Long cardId;
    private String title;
    private Language language;
}
