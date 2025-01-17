package com.wordtree.word;

import com.wordtree.word.dto.GetWordRequest;
import com.wordtree.word.dto.WordRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class WordService {
    private final WordRepository wordRepository;
    @Transactional
    public void add(WordRequest wordRequest) {
        wordRepository.save(Word.requestConvert(wordRequest));
    }
    @Transactional
    public void edit(WordRequest wordRequest) {
        Word findWord = wordRepository.findByTitle(wordRequest.getTitle());
        findWord.setTitle(wordRequest.getTitle());
        findWord.setExample(wordRequest.getExample());
        findWord.setMeaning(wordRequest.getMeaning());
        findWord.setCategory(wordRequest.getCategory());
        findWord.setLevel(wordRequest.getLevel());
    }

    public Word getWordOne(GetWordRequest getWordRequest) {
        Word findword = wordRepository.findByTitle(getWordRequest.getTitle());
        return Word;
    }
}
