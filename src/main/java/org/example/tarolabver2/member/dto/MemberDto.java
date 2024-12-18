package org.example.tarolabver2.member.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.example.tarolabver2.member.ROLE;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class MemberDto {

    private Long id; // 추가된 필드

    @NotBlank(message = "이름은 필수 입력 항목 입니다.")
    @Size(max =30, message="이름은 30자를 초과할 수  없습니다")
    private String name;

    @NotEmpty(message = "닉네임은 필수 입력값 입니다.")
    @Size(max =50, message="이름은 50자를 초과할 수 없습니다.")
    private String nickname;

    @NotEmpty(message = "이메일은 필수 입력값 입니다.")
    private String email;

    @NotEmpty(message = "비밀번호는 필수 입력 항목 입니다.")
    @Size(min = 6, max = 20, message = "비밀번호는 6자 이상, 20자 이하여야 합니다.")
    private String password;

    private ROLE role;
    // 정지 종료 날짜

    private LocalDate banEndDate;

    private LocalDateTime createdAt; // 추가된 필드

    // 정지 사유
    @Size(max = 200, message = "정지 사유는 200자를 초과할 수 없습니다.")
    private String banReason;
    public MemberDto(Long id, String name, String nickname, String email, ROLE role, LocalDate banEndDate, String banReason, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.email = email;
        this.role = role;
        this.banEndDate = banEndDate;
        this.banReason = banReason;
        this.createdAt = createdAt;
    }
}
