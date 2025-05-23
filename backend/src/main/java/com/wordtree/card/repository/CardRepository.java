package com.wordtree.card.repository;

import com.wordtree.card.entity.Card;
import com.wordtree.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card,Long> {

    @Query("select c FROM Card c WHERE c.card_id = :cardId AND c.title = :title")
    Card findCardByTitleAndCardId(@Param("cardId") Long directoryId,@Param("title") String title);
    @Modifying
    @Query("DELETE FROM Card c WHERE c.directory.id = :directoryId")
    void deleteByDirectoryId(@Param("directoryId") Long directoryId);
    @Query("select FROM Card c WHERE c.directory.id = :directoryId")
    List<Card> findByDirectoryId(@Param("directoryId") Long directoryId);
    @Query("select c FROM Card c WHERE c.owner = :member")
    List<Card> findByMember(@Param("member") Member member);

}
