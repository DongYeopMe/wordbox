package com.wordtree.card;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card,Long> {

    @Query("select c FROM Card c where c.language = :language")
    List<Card> findCardsByLanguage(@Param("language") String language);
}
