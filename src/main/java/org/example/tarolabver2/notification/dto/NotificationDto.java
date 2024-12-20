package org.example.tarolabver2.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class NotificationDto {
    private Long id;
    private String message;
    private boolean isRead;
    private LocalDateTime createdAt;
    private Long relatedQuestionId; // 관련된 Question ID
}
