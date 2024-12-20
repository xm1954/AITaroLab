package org.example.tarolabver2.question.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class QuestionRequestDto {

    @NotBlank(message = "질문 내용은 필수입니다.")
    private String content;


    private Long id;
    private String answer;
    private LocalDateTime createdAt;
    private LocalDateTime answeredAt;
    private String memberEmail;
}