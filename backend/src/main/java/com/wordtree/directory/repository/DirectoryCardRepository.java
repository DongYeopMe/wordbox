package com.wordtree.directory.repository;

import com.wordtree.card.entity.Card;
import com.wordtree.directory.entity.DirectoryCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DirectoryCardRepository extends JpaRepository<DirectoryCard, Long> {

    @Query("SELECT dc.directory.title FROM DirectoryCard dc WHERE dc.card.id = :cardId AND dc.directory.member.id = :memberId")
    List<String> findDirectoryTitlesByCardAndMember(@Param("cardId") Long cardId, @Param("memberId") Long memberId);
    @Query("SELECT dc.card FROM DirectoryCard dc WHERE dc.directory.id = :directoryId")
    List<Card> findCardsByDirectoryId(@Param("directoryId") Long directoryId);
}