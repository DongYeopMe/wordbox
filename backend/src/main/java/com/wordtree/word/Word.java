package com.wordtree.word;

import com.wordtree.card.Card;
import com.wordtree.card.CardWord;
import com.wordtree.card.Language;
import com.wordtree.word.dto.WordRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@Table(name = "words")
public class Word {

    @Id
    @Column(name = "word_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "word_title")
    private String title;
    @Column(name = "word_meaning")
    private String meaning;
    @Column(name = "word_example")
    private String example;
    @Column(name = "word_category")
    private Language language;
    @Column(name = "word_level")
    private List<Card> cardList;
    @OneToMany(mappedBy = "word", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CardWord> cardWords = new ArrayList<>();

    public static Word requestConvert(WordRequest wordRequest){
        return Word.builder()
                .title(wordRequest.getTitle())
                .meaning(wordRequest.getMeaning())
                .example(wordRequest.getExample())
                .language(wordRequest.getLanguage())
                .cardList(wordRequest.getCardList())
                .build();
    }
}
