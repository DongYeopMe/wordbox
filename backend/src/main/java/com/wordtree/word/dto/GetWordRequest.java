package com.wordtree.word.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GetWordRequest {
    private String item;
    private String mean;
}
