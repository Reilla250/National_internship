package com.internship.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "internship_id", nullable = false)
    private Internship internship;

    @Column(nullable = false)
    private Integer weekNumber;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String reportContent;

    @Builder.Default
    private LocalDate submissionDate = LocalDate.now();

    @Column(nullable = false, length = 30)
    @Builder.Default
    private String approvalStatus = "PENDING";

    @Column(columnDefinition = "TEXT")
    private String supervisorNotes;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
