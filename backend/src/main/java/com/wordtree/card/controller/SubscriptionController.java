package com.wordtree.card.controller;

import com.wordtree.card.dto.CardUpdateRequest;
import com.wordtree.card.service.SubscriptionService;
import com.wordtree.global.ResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.wordtree.global.ResultCode.CARD_ADD_SUCCESS;
import static com.wordtree.global.ResultCode.CARD_EDIT_SUCCESS;

@RestController
@RequiredArgsConstructor
@RequestMapping("/subscriptions")
public class SubscriptionController {
    private final SubscriptionService subscriptionService;

    @PostMapping("/subscribe")
    public ResponseEntity<Object> subscribe(@RequestParam Long cardId){
        subscriptionService.createSub(cardId);
        return ResponseEntity.ok(ResultResponse.of(CARD_ADD_SUCCESS,true));
    }
    @DeleteMapping("unsubscribe")
    public ResponseEntity<Object> updateCard(@RequestParam Long cardId){
        subscriptionService.deleteSub(cardId);
        return ResponseEntity.ok(ResultResponse.of(CARD_EDIT_SUCCESS,true));
    }

}
