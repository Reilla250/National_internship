package com.internship.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "institutions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Institution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long institutionId;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 100)
    private String type;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(length = 100)
    private String contactEmail;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
