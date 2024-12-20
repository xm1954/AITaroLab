package org.example.tarolabver2.question.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class QuestionResponseDto {

    private Long id;
    private String content;
    private String answer;
    private LocalDateTime createdAt;
    private LocalDateTime answeredAt;

    private String memberEmail; // 질문을 작성한 회원 이메일
}