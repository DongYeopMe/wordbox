package com.wordtree.card.controller;

import com.wordtree.card.service.CardService;
import com.wordtree.card.entity.Item;
import com.wordtree.card.dto.UpdateWordDto;
import com.wordtree.global.ResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.wordtree.global.ResultCode.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/words")
public class WordController {

    private final CardService cardService;

    @PatchMapping("/update")
    public ResponseEntity<Object> updateWord(@RequestParam Long cardId,
                                             @RequestBody UpdateWordDto updateWordDto){
        cardService.updateWord(cardId,updateWordDto);
        return ResponseEntity.ok(ResultResponse.of(WORD_EDIT_SUCCESS,true));
    }
    @GetMapping("/getList")
    public ResponseEntity<Object> getWordList(@RequestParam Long cardId
                                             ){
        cardService.getWords(cardId);
        return ResponseEntity.ok(ResultResponse.of(WORDLIST_GET_SUCCESS,true));
    }

    @PatchMapping("/update/list")
    public ResponseEntity<Object> updateWords(@RequestParam Long cardId,
                                              @RequestParam List<Item> itemlist){
        cardService.updateWords(cardId,itemlist);
        return ResponseEntity.ok(ResultResponse.of(WORDLIST_UPDATE_SUCCESS,true));
    }
}

