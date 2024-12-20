package org.example.tarolabver2.question.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerRequestDto {

    @NotBlank(message = "답변 내용은 필수입니다.")
    private String answer;
}