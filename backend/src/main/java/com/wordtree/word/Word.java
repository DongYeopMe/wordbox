package com.wordtree.word;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.wordtree.card.Card;
import com.wordtree.card.CardWord;
import com.wordtree.card.Language;
import com.wordtree.member.Member;
import com.wordtree.word.dto.WordRequest;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "words")
public class Word {

    @Id
    @Column(name = "word_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "word_item")
    private String item;
    @Column(name = "word_mean")
    private String mean;
    @Column(name = "word_example")
    private String example;
    @Column(name = "word_category")
    private Language language;

    @OneToMany(mappedBy = "word", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<CardWord> cardWords = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Word(String item, String mean, String example, Language language) {
        this.item = item;
        this.mean = mean;
        this.example = example;
        this.language = language;
    }

    public static Word requestConvert(WordRequest wordRequest){
        return Word.builder()
                .item(wordRequest.getItem())
                .mean(wordRequest.getMean())
                .example(wordRequest.getExample())
                .language(wordRequest.getLanguage())
                .build();
    }
}
