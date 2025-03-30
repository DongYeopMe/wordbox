package com.wordtree.quiz;

import com.wordtree.card.entity.Card;
import com.wordtree.card.entity.Item;
import com.wordtree.card.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizService {
    private final CardRepository cardRepository;


    public QuizGetResponse getQuiz(QuizGetRequest quizGetRequest) {
        Card card = cardRepository.findById(quizGetRequest.getCardId())
                .orElseThrow(() -> new RuntimeException("카드를 찾을 수 없습니다."));
        List<Item> filterItems = card.getItemList();
        List<Item> AfterItems = quizGetRequest.getAfterWords();

        filterItems.removeAll(AfterItems);
        Collections.shuffle(filterItems);

        Item randomItem = filterItems.isEmpty() ? null : filterItems.get(0);

        AfterItems.add(randomItem);
        QuizGetResponse response = new QuizGetResponse(randomItem,AfterItems);
        return response;
    }
}
