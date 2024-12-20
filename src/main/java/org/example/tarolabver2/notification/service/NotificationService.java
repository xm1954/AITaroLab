package org.example.tarolabver2.notification.service;

import org.example.tarolabver2.notification.dto.NotificationDto;
import org.example.tarolabver2.notification.entity.Notification;
import org.example.tarolabver2.member.repository.MemberRepository;
import org.example.tarolabver2.notification.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final MemberRepository memberRepository;

    public NotificationService(NotificationRepository notificationRepository, MemberRepository memberRepository) {
        this.notificationRepository = notificationRepository;
        this.memberRepository = memberRepository;
    }

    // 사용자 알림 목록 가져오기
    public List<NotificationDto> getUserNotifications(String email) {
        var member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        return notificationRepository.findByUserId(member.getId()).stream()
                .map(NotificationMapper::toDto)
                .collect(Collectors.toList());
    }

    // 알림 읽음 처리
    public void markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("알림을 찾을 수 없습니다."));
        notification.setRead(true);
        notificationRepository.save(notification);
    }

    // 알림 상세보기
    public NotificationDto getNotificationById(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("알림을 찾을 수 없습니다."));
        return NotificationMapper.toDto(notification);
    }
}
