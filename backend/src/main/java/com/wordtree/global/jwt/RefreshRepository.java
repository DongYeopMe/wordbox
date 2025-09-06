package com.wordtree.global.jwt;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface RefreshRepository extends JpaRepository<RefreshEntity,Long> {
    Boolean existsByRefresh(String refreshToken);

    @Transactional
    void deleteByRefresh(String refresh);
    @Transactional
    void deleteByUserid(String userid);
}
