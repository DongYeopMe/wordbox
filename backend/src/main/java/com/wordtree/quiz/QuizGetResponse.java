package com.wordtree.quiz;

import com.wordtree.card.entity.Item;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class QuizGetResponse {
    private Item item;
    private List<Item> afterWords;
}
