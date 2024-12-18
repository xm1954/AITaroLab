package org.example.tarolabver2.result.repository;

import org.example.tarolabver2.card.entity.Card;
import org.example.tarolabver2.member.entity.Member;
import org.example.tarolabver2.result.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResultRepository extends JpaRepository<Result, Long> {

    List<Result> findByMember(Member member);
    boolean existsByMemberAndCard1(Member member, Card card);
    boolean existsByMemberAndCard2(Member member, Card card);
    boolean existsByMemberAndCard3(Member member, Card card);
    Optional<Result> findByIdAndMember(Long id, Member member);
}
