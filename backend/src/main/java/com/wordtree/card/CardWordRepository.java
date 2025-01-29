package com.wordtree.card;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardWordRepository extends JpaRepository<CardWord,Long> {
}
