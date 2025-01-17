package com.wordtree.word;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WordRepository extends JpaRepository<Word,Long> {

    @Query("select w From Word w where w.title = :title")
    Word findByTitle(@Param("title") String title);

}
