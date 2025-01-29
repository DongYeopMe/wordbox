package com.wordtree.card;

import com.wordtree.word.Word;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Table(name = "card_words")
public class CardWord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name= "card_id", nullable = false)
    private Card card;

    @ManyToOne
    @JoinColumn(name="word_id",nullable=false)
    private Word word;

    @Column(nullable = false)
    @CreatedDate
    private LocalDateTime createdAt;
    @Builder
    public CardWord(Card card, Word word) {
        this.card = card;
        this.word = word;
    }
}
