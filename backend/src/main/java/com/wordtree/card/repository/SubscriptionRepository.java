package com.wordtree.card.repository;

import com.wordtree.card.entity.Card;
import com.wordtree.card.entity.Subscription;
import com.wordtree.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<Subscription> findByMemberAndCard(Member member, Card card);
    void deleteByMemberAndCard(Member member, Card card);
}
