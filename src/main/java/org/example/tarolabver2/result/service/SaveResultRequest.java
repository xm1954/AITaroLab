package org.example.tarolabver2.result.service;

import lombok.Data;

import java.util.List;

@Data
public class SaveResultRequest {
    private List<Long> selectedCardIds; // 클라이언트가 전송하는 카드 ID
    private String gptResult;
    private Long resultId; // 추가: 결과 ID
    private String question; // 수정된 필드 이름
    private boolean[] isReversedArray;  // 각 카드의 역방향 여부 배열

}