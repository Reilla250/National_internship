package com.internship.service;

import com.internship.entity.User;
import com.internship.exception.ResourceNotFoundException;
import com.internship.repository.*;
import lombok.Data;
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
    private final InternshipRepository internshipRepository;
    private final ApplicationRepository applicationRepository;
    private final CertificateRepository certificateRepository;
    private final InstitutionRepository institutionRepository;
    private final CollaborationProjectRepository collaborationProjectRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<com.internship.entity.Company> getAllCompanies() {
        return companyRepository.findAll();
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
        stats.put("activeCollaborations", collaborationProjectRepository.findByStatus("ACTIVE").size());

        // Sector breakdown
        List<Object[]> sectorData = internshipRepository.countBySector();
        Map<String, Long> bySector = new HashMap<>();
        for (Object[] row : sectorData) {
            if (row[0] != null) bySector.put((String) row[0], (Long) row[1]);
        }
        stats.put("internshipsBySector", bySector);
        return stats;
    }
}
