package org.example.tarolabver2.member.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.example.tarolabver2.member.ROLE;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
@Builder
@Entity
@NoArgsConstructor
@ToString
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @NotBlank(message = "이름은 필수 입력 항목입니다.") // 빈 문자열과 공백 허용 안 함
    @Column(nullable = false, length = 30)
    private String name;

    @NotBlank(message = "닉네임은 필수 입력 항목입니다.")
    @Column(nullable = false, length = 50)
    private String nickname;

    @NotBlank(message = "이메일은 필수 입력 항목입니다.")
    @Column(nullable = false, length = 50)
    private String email;

    @NotBlank(message = "비밀번호는 필수 입력 항목입니다.")
    @Column(nullable = false, length = 200)
    private String password;

    @Enumerated(EnumType.STRING)
    private ROLE role;

    // 정지 종료 날짜
    @Column(name = "ban_end_date")
    private LocalDate banEndDate;

    // 정지 사유
    @Column(name = "ban_reason", length = 200)
    private String banReason;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now(); // 생성 시 자동 설정
    }

    public void unban() {
        this.banEndDate = null; // 정지 종료 날짜 초기화
        this.banReason = null;  // 정지 사유 초기화
    }

    public boolean isBanned() {
        return this.banEndDate != null && this.banEndDate.isAfter(LocalDate.now());
    }

}
