package com.internship.repository;

import com.internship.entity.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {
    List<Certificate> findByStudent_StudentId(Long studentId);
    Optional<Certificate> findByCertificateNumber(String certificateNumber);
    Optional<Certificate> findByVerificationCode(String verificationCode);
    boolean existsByStudent_StudentIdAndInternship_InternshipId(Long studentId, Long internshipId);
}
