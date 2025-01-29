package com.wordtree.word;

import com.wordtree.card.*;
import com.wordtree.word.dto.GetWordRequest;
import com.wordtree.word.dto.WordRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class WordService {
    private final WordRepository wordRepository;
    private final CardWordRepository cardWordRepository;
    private final CardRepository cardRepository;
    @Transactional
    public void add(WordRequest wordRequest) {
        Word word =wordRepository.save(Word.requestConvert(wordRequest));
        Card findCard = cardRepository.findById(wordRequest.getCard_id()).orElseThrow(()->new EntityNotFoundException("card 엔티티를 못찾습니다."));
        cardWordRepository.save(new CardWord(findCard,word));
    }
    @Transactional
    public void edit(WordRequest wordRequest) {
        Word findWord = wordRepository.findByTitle(wordRequest.getTitle());
        findWord.setTitle(wordRequest.getTitle());
        findWord.setExample(wordRequest.getExample());
        findWord.setMeaning(wordRequest.getMeaning());
        findWord.setLanguage(wordRequest.getLanguage());
    }

    public Word getWordOne(GetWordRequest getWordRequest) {
        Word findword = wordRepository.findByTitle(getWordRequest.getTitle());
        return findword;
    }
    public Word getWordList(GetWordRequest getWordRequest) {
        Word findword = wordRepository.findByTitle(getWordRequest.getTitle());
        return findword;
    }

}
