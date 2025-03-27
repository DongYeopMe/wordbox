package com.wordtree.card.word;

import com.wordtree.card.Item;
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

    private final WordService wordService;

    @PostMapping("/add")
    public ResponseEntity<Object> addWord(@RequestParam Long cardId,
                                          @RequestParam List<Item> itemlist){
        wordService.addwords(cardId,itemlist);
        return ResponseEntity.ok(ResultResponse.of(WORD_ADD_SUCCESS,true));
    }
    @PatchMapping("/update")
    public ResponseEntity<Object> updateWord(@RequestParam Long cardId,
                                             @RequestBody UpdateWordDto updateWordDto){
        wordService.updateWord(cardId,updateWordDto);
        return ResponseEntity.ok(ResultResponse.of(WORD_EDIT_SUCCESS,true));
    }
    @GetMapping("/getList")
    public ResponseEntity<Object> getWordList(@RequestParam Long cardId
                                             ){
        wordService.getWords(cardId);
        return ResponseEntity.ok(ResultResponse.of(WORDLIST_GET_SUCCESS,true));
    }

    @PatchMapping("/update/list")
    public ResponseEntity<Object> updateWords(@RequestParam Long cardId,
                                              @RequestParam List<Item> itemlist){
        wordService.updateWords(cardId,itemlist);
        return ResponseEntity.ok(ResultResponse.of(WORDLIST_UPDATE_SUCCESS,true));
    }
}

