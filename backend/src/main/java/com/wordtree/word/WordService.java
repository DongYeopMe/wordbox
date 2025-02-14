package com.wordtree.word;

import com.wordtree.card.*;
import com.wordtree.global.jwt.CustomUserDetailsService;
import com.wordtree.member.Member;
import com.wordtree.member.MemberRepository;
import com.wordtree.word.dto.GetWordRequest;
import com.wordtree.word.dto.WordRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WordService {
    private final WordRepository wordRepository;
    private final CardWordRepository cardWordRepository;
    private final CardRepository cardRepository;
    private final CustomUserDetailsService customUserDetailsService;
    private final MemberRepository memberRepository;
    @Transactional
    public void add(WordRequest wordRequest) {
        Word word =Word.requestConvert(wordRequest);
        Member member = customUserDetailsService.getAuthenticatedEntity();
//        Member member = memberRepository.findByUserId("exex1");
        word.setMember(member);

        wordRepository.save(word);
        List<Card> cards = cardRepository.findCardsByTitleANDLanguage(wordRequest.getTitles(),wordRequest.getLanguage());
        if (cards.isEmpty()) {
            throw new EntityNotFoundException("Card Not Found");
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
        findWord.setItem(wordRequest.getItem());
        findWord.setExample(wordRequest.getExample());
        findWord.setMean(wordRequest.getMean());
        findWord.setLanguage(wordRequest.getLanguage());

        List<String> oldTitles = oldCardWords.stream()
                .map(cardWord -> cardWord.getCard().getTitle())
                .toList();
        Set<String> newTitles = new HashSet<>(wordRequest.getTitles());

        // 추가 대상
        Set<String> titlesToAdd = new HashSet<>(newTitles);
        titlesToAdd.removeAll(oldTitles);

        // 삭제 대상
        Set<String> titlesToRemove = new HashSet<>(oldTitles);
        titlesToRemove.removeAll(newTitles);


        if(!titlesToRemove.isEmpty()){
            List<String> removeList = new ArrayList<>(titlesToRemove);
            cardRepository.decrementCardCounts(new ArrayList<>(removeList),wordRequest.getLanguage());
            cardWordRepository.deleteByCardTitlesAndWordAndLanguage(removeList,findWord, wordRequest.getLanguage());
        }
        if (!titlesToAdd.isEmpty()) {
            List<String> addList = new ArrayList<>(titlesToAdd);
            List<Card> cardsToAdd = cardRepository.findCardsByTitleANDLanguage(addList, wordRequest.getLanguage());
            cardRepository.incrementCardCounts(addList,wordRequest.getLanguage());
            List<CardWord> cardWords = cardsToAdd.stream()
                    .map(card -> new CardWord(card, findWord))
                    .toList();
            cardWordRepository.saveAll(cardWords);
        }
    }

    public Word getWordOne(GetWordRequest getWordRequest) {
        Word findword = wordRepository.findByItem(getWordRequest.getItem());
        return findword;
    }
    public Page<Word> getWordList(int size, int page,Language language,Long cardId) {
        Pageable pageable = PageRequest.of(page-1,size);
        Page<Word> findwordPage = wordRepository.findWordsByCardId(cardId,pageable);
        return findwordPage;
    }
    public Page<Word> getMyWordList(int size, int page, Language language){
        Pageable pageable = PageRequest.of(page-1,size);
        Member member = customUserDetailsService.getAuthenticatedEntity();

//        Member member = memberRepository.findById(1L).orElseThrow(()->new RuntimeException("다시"));
        Page<Word> mywordPage = wordRepository.findMyWords(member,language,pageable);
        return mywordPage;
    }
    public int getMyWordCount(Language language){
        Member member = memberRepository.findById(1L).orElseThrow(()->new RuntimeException("다시"));
        if(language ==Language.TOTAL){
            return wordRepository.findMyAllWordCount(member);
        }
        int count = wordRepository.findMyWordCount(member,language);
        return count;
    }

    public List<String> getWordTitles(Long wordId) {

        List<String> list = wordRepository.findTitlesByWord(wordId);
        return list;
    }
}
