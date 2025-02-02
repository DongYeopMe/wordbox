package com.wordtree.card;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CardService {
    private final CardRepository cardRepository;
    @Transactional
    public void createCard(CardRequest cardRequest) {
        cardRepository.save(Card.requestConvert(cardRequest));
    }
    @Transactional
    public void editCard(Long id,CardUpdateRequest cardUpdateRequest) {
        Card card = cardRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Card 엔티티를 못찾았습니다."));
        card.setTitle(cardUpdateRequest.getTitle());
    }

    public List<Card> getList(Language language) {
        // "전체" 선택 시 모든 카드 반환
        if (language == Language.TOTAL) {
            return cardRepository.findAll();
        }
        // 특정 언어에 맞는 카드 반환
        return cardRepository.findCardsByLanguage(language);
    }

    public Card getOne(CardRequest cardRequest) {
        return cardRepository.findCardByLanguageTitle(cardRequest.getLanguage(),cardRequest.getTitle());
    }
}
