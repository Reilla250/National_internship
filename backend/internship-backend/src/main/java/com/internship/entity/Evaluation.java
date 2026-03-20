package com.internship.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "evaluations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Evaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long evaluationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supervisor_id", nullable = false)
    private Supervisor supervisor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "internship_id", nullable = false)
    private Internship internship;

    @Column(precision = 5, scale = 2)
    private BigDecimal performanceScore;

    @Column(precision = 5, scale = 2)
    private BigDecimal technicalScore;

    @Column(precision = 5, scale = 2)
    private BigDecimal communicationScore;

    @Column(precision = 5, scale = 2)
    private BigDecimal teamworkScore;

    @Column(columnDefinition = "TEXT")
    private String comments;

    @Builder.Default
    private LocalDate evaluationDate = LocalDate.now();

    @CreationTimestamp
    private LocalDateTime createdAt;
}
