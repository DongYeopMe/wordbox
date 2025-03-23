package com.wordtree.card;

import com.wordtree.directory.Directory;
import com.wordtree.directory.DireotoryRepository;
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
    private final CardWordRepository cardWordRepository;
    private final DireotoryRepository direotoryRepository;
    @Transactional
    public void createCard(CardRequest cardRequest) {

        Card card =Card.requestConvert(cardRequest);
        card.setDirectory(direotoryRepository.findById(cardRequest.getDirectoryId())
                .orElseThrow(()->new RuntimeException("폴더 엔티티를 못찾았습니다.")));

//        card.setMember(customUserDetailsService.getAuthenticatedEntity());
        cardRepository.save(card);
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

    public void deleteCard(Long cardId) {
        cardWordRepository.deleteByCardId(cardId);
        cardRepository.deleteById(cardId);
    }
}
