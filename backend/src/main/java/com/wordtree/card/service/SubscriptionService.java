package com.wordtree.card.service;

import com.wordtree.card.entity.Card;
import com.wordtree.card.entity.Subscription;
import com.wordtree.card.repository.CardRepository;
import com.wordtree.card.repository.SubscriptionRepository;
import com.wordtree.global.jwt.CustomUserDetailsService;
import com.wordtree.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final CardRepository cardRepository;
    private final CustomUserDetailsService  customUserDetailsService;

    public void createSub(Long cardId) {
        Member member =customUserDetailsService.getAuthenticatedEntity();
        Card card = cardRepository.findById(cardId).orElseThrow(()-> new RuntimeException("카드를 찾을수 없습니다."));
        Subscription subscription = new Subscription(member,card);
        subscriptionRepository.save(subscription);
    }

    public void deleteSub(Long cardId) {
        Member member =customUserDetailsService.getAuthenticatedEntity();
        Card card = cardRepository.findById(cardId).orElseThrow(()-> new RuntimeException("카드를 찾을수 없습니다."));
        subscriptionRepository.deleteByMemberAndCard(member,card);
    }
}
