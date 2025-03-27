package com.wordtree.card;

import com.wordtree.directory.DirectoryRepository;
import com.wordtree.global.jwt.CustomUserDetailsService;
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
    private final DirectoryRepository directoryRepository;
    @Transactional
    public void createCard(CardRequest cardRequest) {

        Card card =Card.requestConvert(cardRequest);
        card.setDirectory(directoryRepository.findById(cardRequest.getDirectoryId())
                .orElseThrow(()->new RuntimeException("폴더 엔티티를 못찾았습니다.")));

        card.setOwner(customUserDetailsService.getAuthenticatedEntity());
        cardRepository.save(card);
    }
    @Transactional
    public void editCard(Long id,CardUpdateRequest cardUpdateRequest) {
        Card card = cardRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Card 엔티티를 못찾았습니다."));
        card.setTitle(cardUpdateRequest.getTitle());
    }

    public List<Card> getList(Long directoryId) {
        List<Card> response =  directoryRepository.findById(directoryId).orElseThrow(() ->new EntityNotFoundException("메시지")).getCards();
        return response;
    }

    public Card getOne(CardRequest cardRequest) {
        return cardRepository.findCardByLanguageTitle(cardRequest.getLanguage(),cardRequest.getTitle());
    }

    public void deleteCard(Long cardId) {
        cardRepository.deleteById(cardId);
    }
}
