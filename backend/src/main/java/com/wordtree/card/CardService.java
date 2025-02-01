package com.wordtree.card;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CardService {
    private final CardRepository cardRepository;
    public void createCard(CardRequest cardRequest) {
        cardRepository.save(Card.requestConvert(cardRequest));
    }

    public void editCard(Long id,CardRequest cardRequest) {
        Card card = cardRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("못찾겠습니다."));
        card.setTitle(cardRequest.getTitle());
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
