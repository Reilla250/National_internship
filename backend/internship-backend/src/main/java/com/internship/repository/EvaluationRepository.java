package com.internship.repository;

import com.internship.entity.Evaluation;
import com.internship.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    List<Evaluation> findByStudent_StudentId(Long studentId);
    void deleteByStudent(Student student);
    List<Evaluation> findBySupervisor_SupervisorId(Long supervisorId);
    Optional<Evaluation> findByStudent_StudentIdAndInternship_InternshipId(Long studentId, Long internshipId);
}
