package com.wordtree.directory;

import com.wordtree.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DirectoryRepository extends JpaRepository<Directory,Long> {
    @Query("select d FROM Directory d WHERE d.member = :member")
    List<Directory> findByMember(@Param("member") Member member);
}
