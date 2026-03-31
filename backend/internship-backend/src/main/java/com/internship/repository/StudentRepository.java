package com.internship.repository;

import com.internship.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByUser_UserId(Long userId);
    Optional<Student> findByRegistrationNumber(String registrationNumber);
    List<Student> findByInstitution_InstitutionId(Long institutionId);
    boolean existsByRegistrationNumber(String registrationNumber);

    @Query("SELECT COUNT(s) FROM Student s")
    long countAllStudents();
}
