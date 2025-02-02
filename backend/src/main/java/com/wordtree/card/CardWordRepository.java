package com.wordtree.card;

import com.wordtree.word.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardWordRepository extends JpaRepository<CardWord,Long> {
    List<CardWord> findByWord(Word word);

    void deleteByCardAndWord(Card card, Word word);
}
