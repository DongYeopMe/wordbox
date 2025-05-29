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

    Card findCardByTitleAndId(String title, Long id);
    @Query("select c FROM Card c WHERE c.owner = :member")
    List<Card> findByMember(@Param("member") Member member);

}
