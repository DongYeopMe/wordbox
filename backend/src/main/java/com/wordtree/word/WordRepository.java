package com.wordtree.word;


import com.wordtree.card.Language;
import com.wordtree.member.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word,Long> {

    @Query("select w From Word w where w.item = :item")
    Word findByItem(@Param("item") String item);
    @Query("SELECT w FROM Word w JOIN CardWord cw ON w.id = cw.word.id WHERE cw.card.id = :cardId")
    Page<Word> findWordsByCardId(@Param("cardId") Long cardId, Pageable pageable);

    @Query("SELECT w FROM Word w WHERE w.member = :member AND w.language = :language")
    Page<Word> findMyWords(@Param("member")Member member, @Param("language") Language language,Pageable pageable);

    @Query("SELECT COUNT(w) FROM Word w WHERE w.member = :member AND w.language = :language")
    int findMyWordCount(@Param("member")Member member,@Param("language") Language language);
    @Query("SELECT COUNT(w) FROM Word w WHERE w.member = :member")
    int findMyAllWordCount(@Param("member")Member member);
    @Query("SELECT c.title FROM Card c JOIN c.cardWords cw WHERE cw.word.id = :wordId")
    List<String> findTitlesByWord(@Param("wordId") Long wordId);
}
