package org.example.tarolabver2.card.repository;

import org.example.tarolabver2.card.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {
    Optional<Card> findByName(String name);  // 카드 이름으로 조회
    boolean existsByName(String name);
}
