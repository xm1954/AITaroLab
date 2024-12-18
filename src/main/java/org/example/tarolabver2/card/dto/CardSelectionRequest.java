package org.example.tarolabver2.card.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardSelectionRequest {
    private Long cardId; // 클라이언트에서 전달받은 카드 ID
}