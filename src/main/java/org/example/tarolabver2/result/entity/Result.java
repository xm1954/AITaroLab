package org.example.tarolabver2.result.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.tarolabver2.card.entity.Card;
import org.example.tarolabver2.member.entity.Member;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    // 카드 1 (과거)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id1", nullable = false)
    private Card card1;

    // 카드 2 (과거)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id2", nullable = false)
    private Card card2;

    // 카드 3 (현재)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id3", nullable = false)
    private Card card3;

    // 카드 4 (현재)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id4", nullable = false)
    private Card card4;

    // 카드 5 (미래)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id5", nullable = false)
    private Card card5;

    // 카드 6 (미래)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id6", nullable = false)
    private Card card6;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    // GPT 해석 결과
    @Column(columnDefinition = "TEXT")
    private String gptResult;

    private String question;  // 질문 필드 추가


    public Result (Member member, Card card1, Card card2, Card card3, Card card4, Card card5, Card card6, LocalDateTime timestamp, String gptResult, String question) {
        this.member = member;
        this.card1 = card1;
        this.card2 = card2;
        this.card3 = card3;
        this.card4 = card4;
        this.card5 = card5;
        this.card6 = card6;
        this.timestamp = timestamp;
        this.gptResult = gptResult;
        this.question = question;

    }
}