package org.example.tarolabver2.question.service;

import org.example.tarolabver2.question.dto.QuestionResponseDto;
import org.example.tarolabver2.question.entity.Question;

public class QuestionMapper {

    public static QuestionResponseDto toDto(Question question) {
        QuestionResponseDto dto = new QuestionResponseDto();
        dto.setId(question.getId());
        dto.setContent(question.getContent());
        dto.setAnswer(question.getAnswer());
        dto.setCreatedAt(question.getCreatedAt());
        dto.setAnsweredAt(question.getAnsweredAt());
        dto.setMemberEmail(question.getMember().getEmail());
        return dto;
    }
}