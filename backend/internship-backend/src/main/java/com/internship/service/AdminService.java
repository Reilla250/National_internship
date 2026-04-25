package com.internship.service;

import com.internship.entity.User;
import com.internship.entity.Student;
import com.internship.exception.ResourceNotFoundException;
import com.internship.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final CompanyRepository companyRepository;
    private final SupervisorRepository supervisorRepository;
    private final InternshipRepository internshipRepository;
    private final ApplicationRepository applicationRepository;
    private final CertificateRepository certificateRepository;
    private final EvaluationRepository evaluationRepository;
    private final InstitutionRepository institutionRepository;
    private final CollaborationProjectRepository collaborationProjectRepository;
    private final NotificationRepository notificationRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<com.internship.entity.Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

        // Clean up role-specific profiles and related data
        String roleName = user.getRole().getRoleName();
        
        switch (roleName) {
            case "STUDENT" -> {
                studentRepository.findByUser_UserId(userId).ifPresent(s -> {
                    applicationRepository.deleteByStudent(s);
                    certificateRepository.deleteByStudent(s);
                    evaluationRepository.deleteByStudent(s);
                    studentRepository.delete(s);
                });
            }
            case "COMPANY" -> {
                companyRepository.findByUser_UserId(userId).ifPresent(c -> {
                    // For company, we also delete their internships and projects
                    internshipRepository.findByCompany(c).forEach(i -> {
                        applicationRepository.deleteByInternship(i);
                        internshipRepository.delete(i);
                    });
                    collaborationProjectRepository.deleteByCompany(c);
                    companyRepository.delete(c);
                });
            }
            case "SUPERVISOR" -> {
                supervisorRepository.findByUser_UserId(userId).ifPresent(supervisorRepository::delete);
            }
            case "INSTITUTION" -> {
                // Institutions might be linked to many students/supervisors. 
                // For now, only delete profile if empty or just delete the profile link.
                // Usually institution is its own entity not just a profile.
            }
        }

        // Delete notifications
        notificationRepository.deleteByRecipient(user);
        
        // Finally delete the user
        userRepository.delete(user);
    }

    @Transactional
    public User setUserStatus(Long userId, String status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
        user.setStatus(status);
        return userRepository.save(user);
    }

    public Map<String, Object> getSystemStats() {
        Map<String, Object> stats = new HashMap<>();
        
        try {
            stats.put("totalUsers",           userRepository.count());
            stats.put("totalStudents",        studentRepository.count());
            stats.put("totalCompanies",       companyRepository.count());
            stats.put("totalInstitutions",    institutionRepository.count());
            stats.put("totalInternships",     internshipRepository.count());
            stats.put("openInternships",      internshipRepository.countOpenInternships());
            stats.put("totalApplications",    applicationRepository.count());
            stats.put("pendingApplications",  applicationRepository.countPendingApplications());
            stats.put("acceptedApplications", applicationRepository.countAcceptedApplications());
            stats.put("totalCertificates",    certificateRepository.count());
            
            stats.put("activeCollaborations", collaborationProjectRepository.findAll().stream()
                    .filter(p -> "ACTIVE".equals(p.getStatus())).count());
            
            List<Object[]> sectorData = internshipRepository.countBySector();
            Map<String, Long> bySector = new HashMap<>();
            for (Object[] row : sectorData) {
                if (row[0] != null) {
                    bySector.put(row[0].toString(), Long.valueOf(row[1].toString()));
                }
            }
            stats.put("internshipsBySector", bySector);
        } catch (Exception e) {
            e.printStackTrace();
            stats.put("ERROR_MESSAGE", e.getMessage());
            stats.put("ERROR_CLASS", e.getClass().getName());
        }
        
        return stats;
    }
    @Transactional
    public void assignSupervisorToStudent(Long studentId, Long supervisorId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found: " + studentId));
        supervisorRepository.findById(supervisorId)
                .orElseThrow(() -> new ResourceNotFoundException("Supervisor not found: " + supervisorId));
        student.setSupervisorId(supervisorId);
        studentRepository.save(student);
    }

    public List<com.internship.entity.Supervisor> getAllSupervisors() {
        return supervisorRepository.findAll();
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}
