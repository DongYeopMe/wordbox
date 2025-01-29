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

    @OneToMany(mappedBy = "word", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CardWord> cardWords = new ArrayList<>();

    @Builder
    public Word(String title, String meaning, String example, Language language) {
        this.title = title;
        this.meaning = meaning;
        this.example = example;
        this.language = language;
    }

    public static Word requestConvert(WordRequest wordRequest){
        return Word.builder()
                .title(wordRequest.getTitle())
                .meaning(wordRequest.getMeaning())
                .example(wordRequest.getExample())
                .language(wordRequest.getLanguage())
                .build();
    }
}
