package com.wordtree.card.repository;

import com.wordtree.card.entity.Card;
import com.wordtree.card.entity.Language;
import com.wordtree.directory.Directory;
import com.wordtree.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card,Long> {

    @Query("select c FROM Card c where c.language = :language")
    List<Card> findCardsByLanguage(@Param("language") String language);
    @Query("select c FROM Card c where c.language = :language AND c.title = :title")
    Card findCardByLanguageTitle(@Param("language") String language,@Param("title") String title);
    @Query("select c FROM Card c where c.title IN :titles AND c.language = :language")
    List<Card> findCardsByTitleANDLanguage(@Param("titles") List<String> titles,@Param("language") Language language);
    @Modifying
    @Query("UPDATE Card c SET c.count = c.count + 1 WHERE c.title = :title AND c.language = :language")
    void incrementCardCount(@Param("title") String title,@Param("language") Language language);
    @Modifying
    @Query("UPDATE Card c SET c.count = c.count + 1 WHERE c.title IN :titles AND c.language = :language")
    void incrementCardCounts(@Param("titles") List<String> titles,@Param("language") Language language);
    @Modifying
    @Query("UPDATE Card c SET c.count = c.count - 1 WHERE c.title = :title AND c.language = :language")
    void decrementCardCount(@Param("title") String title,@Param("language") Language language);
    @Modifying
    @Query("UPDATE Card c SET c.count = c.count - 1 WHERE c.title IN :titles AND c.language = :language")
    void decrementCardCounts(@Param("titles") List<String> titles,@Param("language") Language language);
    @Query("select c FROM Card c WHERE c.directory.id = :directoryId AND c.title = :title")
    Card findCardByTitleAndDIRId(@Param("directoryId") Long directoryId,@Param("title") String title);
    @Modifying
    @Query("DELETE FROM Card c WHERE c.directory.id = :directoryId")
    void deleteByDirectoryId(@Param("directoryId") Long directoryId);
    @Query("select c FROM Card c WHERE c.member = :member")
    List<Card> findByMember(@Param("member") Member member);

    @Modifying
    @Transactional
    @Query("UPDATE Card c SET c.count = c.count - 1 WHERE c.id IN :cardIds AND c.count > 0")
    void decrementCountsByCardIds(@Param("cardIds") List<Long> cardIds);

}
