package com.wordtree.word;

import com.wordtree.word.dto.WordRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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
    private String category;
    @Column(name = "word_level")
    private String level;

    public static Word requestConvert(WordRequest wordRequest){
        return Word.builder()
                .title(wordRequest.getTitle())
                .meaning(wordRequest.getMeaning())
                .example(wordRequest.getExample())
                .category(wordRequest.getCategory())
                .level(wordRequest.getLevel())
                .build();
    }
}
