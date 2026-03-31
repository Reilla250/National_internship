package com.internship.service;

import com.internship.entity.Student;
import com.internship.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class InstitutionService {

    private final StudentRepository studentRepository;
    private final ApplicationRepository applicationRepository;
    private final ReportRepository reportRepository;
    private final CertificateRepository certificateRepository;
    private final InstitutionRepository institutionRepository;

    public List<Student> getStudentsByInstitution(Long institutionId) {
        return studentRepository.findByInstitution_InstitutionId(institutionId);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public List<com.internship.entity.Institution> getAllInstitutions() {
        return institutionRepository.findAll();
    }

    public Map<String, Object> getInstitutionStats(Long institutionId) {
        List<Student> students = studentRepository.findByInstitution_InstitutionId(institutionId);
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalStudents", students.size());

        long totalApps = students.stream()
                .mapToLong(s -> applicationRepository.findByStudent_StudentId(s.getStudentId()).size())
                .sum();
        long acceptedApps = students.stream()
                .mapToLong(s -> applicationRepository.findByStudent_StudentId(s.getStudentId())
                        .stream().filter(a -> "ACCEPTED".equals(a.getStatus())).count())
                .sum();
        long totalCerts = students.stream()
                .mapToLong(s -> certificateRepository.findByStudent_StudentId(s.getStudentId()).size())
                .sum();

        stats.put("totalApplications", totalApps);
        stats.put("acceptedPlacements", acceptedApps);
        stats.put("certificatesIssued", totalCerts);
        return stats;
    }
}
