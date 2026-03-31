package com.internship.service;

import com.internship.dto.response.NotificationResponse;
import com.internship.entity.Notification;
import com.internship.entity.User;
import com.internship.repository.NotificationRepository;
import com.internship.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public void createNotification(String email, String message, String type) {
        userRepository.findByEmail(email).ifPresent(user -> {
            Notification notification = Notification.builder()
                    .recipient(user)
                    .message(message)
                    .type(type)
                    .isRead(false)
                    .build();
            notificationRepository.save(notification);
        });
    }

    public List<NotificationResponse> getMyNotifications(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return notificationRepository.findByRecipientOrderByCreatedAtDesc(user).stream()
                .map(NotificationResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public void markAsRead(Long id, String email) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        if (!notification.getRecipient().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }
        notification.setIsRead(true);
        notificationRepository.save(notification);
    }

    @Transactional
    public void markAllAsRead(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        notificationRepository.markAllAsReadForUser(user);
    }
}
