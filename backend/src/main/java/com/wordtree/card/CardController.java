package com.wordtree.card;

import com.wordtree.global.ResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.wordtree.global.ResultCode.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/card")
public class CardController {
    private final CardService cardService;

    @PostMapping("/create")
    public ResponseEntity<Object> createCard(@RequestBody CardRequest cardRequest){
        cardService.createCard(cardRequest);
        return ResponseEntity.ok(ResultResponse.of(CARD_ADD_SUCCESS,true));
    }
    @PostMapping("/update/{id}")
    public ResponseEntity<Object> updateCard(@PathVariable Long id,@RequestBody CardRequest cardRequest){
        cardService.editCard(id,cardRequest);
        return ResponseEntity.ok(ResultResponse.of(CARD_EDIT_SUCCESS,true));
    }

    @GetMapping("/getCard")
    public ResponseEntity<Object> getCard(@RequestBody CardRequest cardRequest){
        Card response =cardService.getOne(cardRequest);
        return ResponseEntity.ok(ResultResponse.of(CARD_ADD_SUCCESS,response));
    }

    @GetMapping("/getList")
    public ResponseEntity<Object> getCards(@RequestParam Language language){
        List<Card> response =cardService.getList(language);
        return ResponseEntity.ok(ResultResponse.of(CARDLIST_GET_SUCCESS,response));
    }


}
