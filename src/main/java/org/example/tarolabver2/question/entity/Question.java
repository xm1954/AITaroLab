package org.example.tarolabver2.question.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.example.tarolabver2.member.entity.Member;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Question {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(nullable = false, length = 500)
    private String content;

    @Column(nullable = false)
    private String answer = "";

    private LocalDateTime createdAt;

    private LocalDateTime answeredAt;




    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }


}
