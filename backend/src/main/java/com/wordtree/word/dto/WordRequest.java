package com.wordtree.word.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class WordRequest {

    private String title;
    private String meaning;
    private String example;
    private String category;
    private String level;
}
