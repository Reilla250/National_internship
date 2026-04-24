package com.internship.repository;

import com.internship.entity.Notification;
import com.internship.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    
    List<Notification> findByRecipientOrderByCreatedAtDesc(User recipient);
    
    @Modifying
    @Query("UPDATE Notification n SET n.status = 'READ' WHERE n.recipient = :recipient")
    void markAllAsReadForUser(User recipient);
    
    void deleteByRecipient(User recipient);
}
