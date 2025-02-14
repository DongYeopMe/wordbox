package com.wordtree.card;

import com.wordtree.word.Word;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@NoArgsConstructor
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

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Builder
    public CardWord(Card card, Word word) {
        this.card = card;
        this.word = word;
        this.createdAt = LocalDateTime.now();
    }
}
