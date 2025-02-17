package com.wordtree.card;

import com.wordtree.word.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardWordRepository extends JpaRepository<CardWord,Long> {
    List<CardWord> findByWord(Word word);

    void deleteByCardAndWord(Card card, Word word);

    @Modifying
    @Query("DELETE FROM CardWord cw WHERE cw.card.title IN :titles AND cw.word = :word AND cw.card.language = :language")
    void deleteByCardTitlesAndWordAndLanguage(@Param("titles") List<String> titles, @Param("word") Word word, @Param("language") Language language);
    @Modifying
    @Query("DELETE FROM CardWord cw WHERE cw.word.id = :wordId")
    void deleteByWordId(@Param("wordId") Long wordId);
    @Modifying
    @Query("DELETE FROM CardWord cw WHERE cw.card.id = :cardId")
    void deleteByCardId(@Param("cardId") Long cardId);

    @Query("SELECT cw.card.id FROM CardWord cw WHERE cw.word.id = :wordId")
    List<Long> findCardIdsByWordId(@Param("wordId") Long wordId);

}
