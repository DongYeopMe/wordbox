package com.wordtree.card.service;

import com.wordtree.card.dto.CardGetRequest;
import com.wordtree.card.dto.CardRequest;
import com.wordtree.card.dto.CardUpdateRequest;
import com.wordtree.card.entity.Card;
import com.wordtree.card.entity.Item;
import com.wordtree.card.repository.CardRepository;
import com.wordtree.directory.DirectoryRepository;
import com.wordtree.global.jwt.CustomUserDetailsService;
import com.wordtree.member.entity.Member;
import com.wordtree.member.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CardService {
    private final CardRepository cardRepository;
    private final CustomUserDetailsService customUserDetailsService;
    private final MemberRepository memberRepository;
    private final DirectoryRepository directoryRepository;
    @Transactional
    public void createCard(CardRequest cardRequest) {

        Card card =Card.requestConvert(cardRequest);
        card.setDirectory(directoryRepository.findById(cardRequest.getDirectoryId())
                .orElseThrow(()->new RuntimeException("폴더 엔티티를 못찾았습니다.")));
        card.setOwner(customUserDetailsService.getAuthenticatedEntity());
        cardRepository.save(card);
    }
    //추가 및 삭제
    @Transactional
    public void updateCard(Long id, CardUpdateRequest cardUpdateRequest) {
        Card card = cardRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Card 엔티티를 못찾았습니다."));
        card.setTitle(cardUpdateRequest.getTitle());
        card.setDescription(cardUpdateRequest.getDescription());
        card.setItemList(cardUpdateRequest.getItemlist());
        card.setCount(cardUpdateRequest.getItemlist().size());
    }

    public Card getOne(CardGetRequest request) {
        return cardRepository.findCardByTitleAndDIRId(request.getDirectoryId(),request.getTitle());
    }

    public void deleteCard(Long cardId) {
        cardRepository.deleteById(cardId);
    }
    public List<Card> getCards(String username) {
        Member findmember = memberRepository.findByUserName(username);
        List<Card> response =  cardRepository.findByMember(findmember);
        return response;
    }

    public List<Item> getWords(Long cardId) {
        Card findCard = cardRepository.findById(cardId).
                orElseThrow(() -> new EntityNotFoundException("Card 엔티티를 못찾았습니다."));
        return findCard.getItemList();
    }

    public List<Card> getList(String userName) {
        Member member = memberRepository.findByUserName(userName);
        List<Card> response =cardRepository.findByMember(member);
        return response;
    }
    public List<Card> getMyCardList() {
        List<Card> response =cardRepository.findByMember(customUserDetailsService.getAuthenticatedEntity());
        return response;
    }

}
