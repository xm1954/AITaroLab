package org.example.tarolabver2.notification.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.example.tarolabver2.member.entity.Member;

import java.time.LocalDateTime;


@Entity
@Table(name = "notification")
@Getter
@Setter
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false) // 변경된 부분
    private Member user;

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private boolean isRead;

    private LocalDateTime createdAt;

    private Long relatedQuestionId;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
