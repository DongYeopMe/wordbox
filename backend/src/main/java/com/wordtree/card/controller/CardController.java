package com.wordtree.card.controller;

import com.wordtree.card.dto.*;
import com.wordtree.card.entity.Card;
import com.wordtree.card.service.CardService;
import com.wordtree.global.ResultCode;
import com.wordtree.global.ResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.wordtree.global.ResultCode.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/card")
//getCard,getWordlist로 나눈 이유 : 페이지네이션으로 받아와야해서 나눔.
public class CardController {
    private final CardService cardService;

    @PostMapping("/create")
    public ResponseEntity<Object> createCard(@RequestBody CardRequest cardRequest){
        cardService.createCard(cardRequest);
        return ResponseEntity.ok(ResultResponse.of(CARD_ADD_SUCCESS,true));
    }
    @PatchMapping("/update/{id}")
    public ResponseEntity<Object> updateCard(@PathVariable Long id,@RequestBody CardUpdateRequest cardUpdateRequest){
        cardService.updateCard(id,cardUpdateRequest);
        return ResponseEntity.ok(ResultResponse.of(CARD_EDIT_SUCCESS,true));
    }

    @GetMapping("/getCard")
    public ResponseEntity<Object> getCard(@RequestBody CardGetRequest cardGetRequest){
        UserCardResponse response =cardService.getOne(cardGetRequest);
        return ResponseEntity.ok(ResultResponse.of(CARD_GET_SUCCESS,response));
    }

    @GetMapping("/getUserCards")
    public ResponseEntity<Object> getUserCards(@RequestParam Long directoryId){
        List<Card> response =cardService.getCards(directoryId);
        return ResponseEntity.ok(ResultResponse.of(CARDLIST_GET_SUCCESS,response));
    }
    @DeleteMapping("delete")
    public ResponseEntity<Object> deleteCard(@RequestParam Long cardId){
        cardService.deleteCard(cardId);
        return ResponseEntity.ok(ResultResponse.of(CARD_DELETE_SUCCESS));
    }
    @GetMapping("/getWordList")
    public ResponseEntity<Object> getWordList(@RequestBody CardGetRequest request){
        CardWordListResponse response =cardService.getWords(request);
        return ResponseEntity.ok(ResultResponse.of(WORDLIST_GET_SUCCESS,true));
    }
    @GetMapping("/getMyCards")
    public ResponseEntity<Object> getMyCards(){
        List<Card> response =cardService.getMyCardList();
        return ResponseEntity.ok(ResultResponse.of(CARDLIST_GET_SUCCESS,response));
    }

}
