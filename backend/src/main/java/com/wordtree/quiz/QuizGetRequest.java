package com.wordtree.quiz;

import com.wordtree.card.entity.Item;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class QuizGetRequest {
    private Long cardId;
    private List<Item> afterWords;
}
