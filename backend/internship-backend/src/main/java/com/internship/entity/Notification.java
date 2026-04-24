package com.internship.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User recipient;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 255)
    private String message;

    @Column(nullable = false, length = 50)
    private String type; // e.g., INFO, SUCCESS, WARNING, DANGER

    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    private String status = "UNREAD";

    public boolean getIsRead() {
        return "READ".equalsIgnoreCase(status);
    }

    public void setIsRead(boolean isRead) {
        this.status = isRead ? "READ" : "UNREAD";
    }

    @CreationTimestamp
    private LocalDateTime createdAt;
}
