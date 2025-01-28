package com.wordtree.card;

import com.wordtree.word.Word;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
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
    private LocalDateTime createdAt;
}
