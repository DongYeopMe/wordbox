package com.wordtree.word;

import com.wordtree.card.Language;
import com.wordtree.global.ResultCode;
import com.wordtree.global.ResultResponse;
import com.wordtree.word.dto.GetWordRequest;
import com.wordtree.word.dto.WordRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/word")
public class WordController {

    private final WordService wordService;

    @PostMapping("/add")
    public ResponseEntity<Object> addWord(@RequestBody WordRequest wordRequest){
        wordService.add(wordRequest);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.WORD_ADD_SUCCESS));
    }
    @PatchMapping("/edit")
    public ResponseEntity<Object> editWord(@RequestParam Long wordId,@RequestBody WordRequest wordRequest){
        wordService.edit(wordId,wordRequest);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.WORD_EDIT_SUCCESS));
    }
    @GetMapping("/get")
    public ResponseEntity<Object> getWord(GetWordRequest getWordRequest){
        Word repsonse =wordService.getWordOne(getWordRequest);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.WORDLIST_GET_SUCCESS,repsonse));
    }
    @GetMapping("/getList")
    public ResponseEntity<Object> getWordListInCard(@RequestParam(defaultValue = "1")int page,
                                                    @RequestParam(defaultValue = "10")int size,
                                                    @RequestParam Language language,
                                                    @RequestParam Long cardId){
        Page<Word> response = wordService.getWordList(size,page,language,cardId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.WORDLIST_GET_SUCCESS,response));
    }
    @GetMapping("/getMyList")
    public ResponseEntity<Object> getMyWordList(@RequestParam(defaultValue = "1")int page,
                                                @RequestParam(defaultValue = "10")int size,
                                                @RequestParam Language language){
        Page<Word> response = wordService.getMyWordList(size,page,language);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.WORDLIST_GET_SUCCESS,response));
    }
    @GetMapping("/getMyWordCount")
    public ResponseEntity<Object> getMyWordCount(
                                                @RequestParam Language language){
        int response = wordService.getMyWordCount(language);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.WORDLIST_GET_SUCCESS,response));
    }
    @GetMapping("getWordTitles")
    public ResponseEntity<Object> getWordTitle(@RequestParam Long wordId){
        List<String> response= wordService.getWordTitles(wordId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.WORDTITLES_GET_SUCCESS,response));
    }





}
