package com.internship.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companyId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false, length = 150)
    private String companyName;

    @Column(length = 100)
    private String industrySector;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(length = 100)
    private String contactPerson;

    @Column(length = 20)
    private String phone;

    @Column(length = 200)
    private String website;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
