package com.internship.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "certificates")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long certificateId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "internship_id", nullable = false)
    private Internship internship;

    @Builder.Default
    private LocalDate issueDate = LocalDate.now();

    @Column(nullable = false, unique = true, length = 100)
    private String certificateNumber;

    @Column(nullable = false, unique = true, length = 100)
    private String verificationCode;

    @Column(length = 150)
    private String issuedBy;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
