package com.wordtree.member.repository;

import com.wordtree.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {

    @Query("select m From Member m where m.username = :username")
    Member findByUserName(@Param("username") String username);

    boolean existsByUsername(String username);

    boolean existsByNickname(String nickname);

    void deleteByUsername(String username);

    Optional<Member> findByUsernameAndIsSocial(String username, boolean isSocial);

    Optional<Member> findByUsernameAndIsLockAndIsSocial(String username, Boolean isLock, Boolean isSocial);
}

