package org.example.tarolabver2.notification.service;


import org.example.tarolabver2.notification.dto.NotificationDto;
import org.example.tarolabver2.notification.entity.Notification;

public class NotificationMapper {
    public static NotificationDto toDto(Notification notification) {
        return new NotificationDto(
                notification.getId(),
                notification.getMessage(),
                notification.isRead(),
                notification.getCreatedAt(),
                notification.getRelatedQuestionId() // Question ID가 있으면 전달
        );
    }
}
