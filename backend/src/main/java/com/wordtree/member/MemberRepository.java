package com.wordtree.member;

import com.wordtree.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {

    @Query("select m From Member m where m.username = :username")
    Member findByUserName(@Param("nickname") String username);

    @Query("select m From Member m where m.userid = :userid")
    Member findByUserId(@Param("userid") String userid);

    boolean existsByUserid(String userid);

    Optional<Member> findByUseridAndIsLockAndIsSocial(String userid, Boolean isLock, Boolean isSocial);

}

