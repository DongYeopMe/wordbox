package com.wordtree.word.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GetWordRequest {
    private String title;
    private String meaning;
}
