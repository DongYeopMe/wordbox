package com.wordtree.card.service;

import com.wordtree.card.dto.*;
import com.wordtree.card.entity.Card;
import com.wordtree.card.entity.Item;
import com.wordtree.card.repository.CardRepository;
import com.wordtree.directory.repository.DirectoryCardRepository;
import com.wordtree.directory.repository.DirectoryRepository;
import com.wordtree.global.jwt.CustomUserDetailsService;
import com.wordtree.member.Member;
import com.wordtree.member.MemberRepository;
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
    private final DirectoryCardRepository directoryCardRepository;
    @Transactional
    public void createCard(CardRequest cardRequest) {

        Card card =Card.requestConvert(cardRequest);
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

    public UserCardResponse getOne(CardGetRequest request) {
        Card card =  cardRepository.findCardByTitleAndId(request.getTitle(),request.getCardId());
        Member member = customUserDetailsService.getAuthenticatedEntity();
        List<String> titles = directoryCardRepository.findDirectoryTitlesByCardAndMember(request.getCardId(), member.getId());
        boolean inDIR = !titles.isEmpty();

        UserCardResponse response = new UserCardResponse(card.getId(), card.getTitle(), card.getCount(),
                card.getOwner().getUsername(),titles,inDIR,checkUserIsMe(card.getOwner().getId()));
        return response;
    }

    public void deleteCard(Long cardId) {
        cardRepository.deleteById(cardId);
    }
    public List<Card> getCards(Long directoryId) {
        Member member = customUserDetailsService.getAuthenticatedEntity();
        List<Card> list =  directoryCardRepository.findCardsByDirectoryId(directoryId);
        return list;
    }

    public CardWordListResponse getWords(CardGetRequest request) {
        Card findCard = cardRepository.findCardByTitleAndId(request.getTitle(),request.getCardId());
        CardWordListResponse response = new CardWordListResponse(findCard.getItemList(),checkUserIsMe(findCard.getOwner().getId()));
        return response;
    }
    public List<Card> getMyCardList() {
        List<Card> response =cardRepository.findByMember(customUserDetailsService.getAuthenticatedEntity());
        return response;
    }
    public boolean checkUserIsMe(Long memberId){
        Member member = customUserDetailsService.getAuthenticatedEntity();
        return member.getId().equals(memberId);
    }


}
