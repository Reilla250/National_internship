package com.internship.repository;

import com.internship.entity.Application;
import com.internship.entity.Student;
import com.internship.entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByStudent_StudentId(Long studentId);
    List<Application> findByInternship_InternshipId(Long internshipId);
    void deleteByStudent(Student student);
    void deleteByInternship(Internship internship);
    Optional<Application> findByStudent_StudentIdAndInternship_InternshipId(Long studentId, Long internshipId);
    boolean existsByStudent_StudentIdAndInternship_InternshipId(Long studentId, Long internshipId);

    @Query("SELECT a FROM Application a WHERE a.internship.company.companyId = :companyId")
    List<Application> findByCompanyId(@Param("companyId") Long companyId);

    @Query("SELECT COUNT(a) FROM Application a WHERE a.status = 'PENDING'")
    long countPendingApplications();

    @Query("SELECT COUNT(a) FROM Application a WHERE a.status = 'ACCEPTED'")
    long countAcceptedApplications();
}
