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
        Card card = new Card();
        card.setLanguage(cardRequest.getLanguage());
        card.setTitle(cardRequest.getTitle());
        card.setCount(0);
        cardRepository.save(card);
    }

    public void editCard(Long id,CardRequest cardRequest) {
        Card card = cardRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("못찾겠습니다."));
        card.setTitle(cardRequest.getTitle());
    }

    public List<Card> getList(String language) {
        if(language.equals(Language.TOTAL.name())){
            List<Card> cards = cardRepository.findAll();
            return cards;
        }
        else{
            List<Card> cards = cardRepository.findCardsByLanguage(language);
            return cards;
        }
    }
}
