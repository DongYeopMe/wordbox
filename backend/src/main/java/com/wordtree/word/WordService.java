package com.wordtree.word;

import com.wordtree.card.Card;
import com.wordtree.card.CardRepository;
import com.wordtree.card.CardWord;
import com.wordtree.card.CardWordRepository;
import com.wordtree.word.dto.GetWordListRequest;
import com.wordtree.word.dto.GetWordRequest;
import com.wordtree.word.dto.WordRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WordService {
    private final WordRepository wordRepository;
    private final CardWordRepository cardWordRepository;
    private final CardRepository cardRepository;
    @Transactional
    public void add(WordRequest wordRequest) {
        Word word =wordRepository.save(Word.requestConvert(wordRequest));

        List<Card> cards = cardRepository.findCardsByTitleANDLanguage(wordRequest.getTitles(),wordRequest.getLanguage());
        if (cards.isEmpty()) {
            throw new EntityNotFoundException("카드를 찾을 수 없습니다.");
        }
        cardRepository.incrementCardCounts(wordRequest.getTitles(),wordRequest.getLanguage());

        List<CardWord> cardWords = cards.stream()
                .map(card -> new CardWord(card,word))
                .collect(Collectors.toList());
        cardWordRepository.saveAll(cardWords);
    }
    @Transactional
    public void edit(Long id,WordRequest wordRequest) {
        Word findWord = wordRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Word Entity 못찾았습니다."));

        List<CardWord> oldCardWords = cardWordRepository.findByWord(findWord);
        List<Card> oldCards = oldCardWords.stream()
                .map(CardWord::getCard)
                .collect(Collectors.toList());

        findWord.setItem(wordRequest.getItem());
        findWord.setItem(wordRequest.getItem());
        findWord.setExample(wordRequest.getExample());
        findWord.setMean(wordRequest.getMean());
        findWord.setLanguage(wordRequest.getLanguage());

        List<Card> newCards = cardRepository.findCardsByTitleANDLanguage(wordRequest.getTitles(),wordRequest.getLanguage());
        if (newCards.isEmpty()) {
            throw new EntityNotFoundException("카드를 찾을 수 없습니다.");
        }
        for (Card oldCard : oldCards) {
            if (!newCards.contains(oldCard)) { // 새로운 카드 리스트에 없는 경우
                cardRepository.decrementCardCounts(oldCard.getTitle(), oldCard.getLanguage());
                cardWordRepository.deleteByCardAndWord(oldCard, findWord);
            }
        }

        cardRepository.incrementCardCounts(wordRequest.getTitles(),wordRequest.getLanguage());

        List<CardWord> newCardWords = newCards.stream()
                .map(card -> new CardWord(card,findWord))
                .collect(Collectors.toList());
        cardWordRepository.saveAll(newCardWords);

    }

    public Word getWordOne(GetWordRequest getWordRequest) {
        Word findword = wordRepository.findByItem(getWordRequest.getItem());
        return findword;
    }
    public Page<Word> getWordList(int size, int page, GetWordListRequest getWordListRequest) {
        Pageable pageable = PageRequest.of(page-1,size);
        Page<Word> findwordPage = wordRepository.findWordsByCardId(getWordListRequest.getCardId(),pageable);
        return findwordPage;
    }

}
