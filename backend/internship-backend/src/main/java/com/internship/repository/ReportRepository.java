package com.internship.repository;

import com.internship.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByStudent_StudentId(Long studentId);
    List<Report> findByInternship_InternshipId(Long internshipId);
    List<Report> findByStudent_StudentIdAndInternship_InternshipId(Long studentId, Long internshipId);
    boolean existsByStudent_StudentIdAndInternship_InternshipIdAndWeekNumber(Long studentId, Long internshipId, int weekNumber);
}
