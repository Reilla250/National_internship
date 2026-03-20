package com.internship.service;

import com.internship.repository.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final StudentRepository studentRepository;
    private final InternshipRepository internshipRepository;
    private final ApplicationRepository applicationRepository;
    private final CertificateRepository certificateRepository;
    private final CollaborationProjectRepository collaborationProjectRepository;

    public Map<String, Object> getNationalStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalStudents",          studentRepository.countAllStudents());
        stats.put("openInternships",         internshipRepository.countOpenInternships());
        stats.put("pendingApplications",     applicationRepository.countPendingApplications());
        stats.put("acceptedApplications",    applicationRepository.countAcceptedApplications());
        stats.put("totalCertificates",       certificateRepository.count());
        stats.put("activeCollaborations",    collaborationProjectRepository.findByStatus("ACTIVE").size());

        // Internships by sector
        List<Object[]> sectorData = internshipRepository.countBySector();
        Map<String, Long> bySector = new HashMap<>();
        for (Object[] row : sectorData) {
            bySector.put((String) row[0], (Long) row[1]);
        }
        stats.put("internshipsBySector", bySector);

        return stats;
    }
}
