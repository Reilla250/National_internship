package com.internship.controller;

import com.internship.entity.Institution;
import com.internship.repository.InstitutionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestInstitutionController {

    private final InstitutionRepository institutionRepository;
    
    private final String[] INSTITUTIONS = {
        "University of Rwanda (UR)",
        "Kigali Independent University (ULK)",
        "Adventist University of Central Africa (AUCA)",
        "Mount Kenya University (MKU) Rwanda",
        "Carnegie Mellon University (CMU) Africa",
        "Rwanda Polytechnic (RP) - IPRC Kigali",
        "Rwanda Polytechnic (RP) - IPRC Tumba",
        "Rwanda Polytechnic (RP) - IPRC Huye",
        "Rwanda Polytechnic (RP) - IPRC Karongi",
        "Rwanda Polytechnic (RP) - IPRC Ngoma",
        "Rwanda Polytechnic (RP) - IPRC Musanze",
        "Rwanda Polytechnic (RP) - IPRC Gishari",
        "Rwanda Polytechnic (RP) - IPRC Kitabi",
        "University of Tourism, Technology and Business Studies (UTB)",
        "INES Ruhengeri",
        "Kepler University",
        "African Leadership University (ALU)",
        "University of Global Health Equity (UGHE)",
        "University of Lay Adventists of Kigali (UNILAK)",
        "kibogora Polytechnic (KP)",
        "East African University Rwanda (EAUR)",
        "Catholic University of Rwanda (CUR)",
        "Protestant Institute of Arts and Social Sciences (PIASS)",
        "Ruli Higher Institute of Health (RHIH)",
        "Rwanda Institute for Conservation Agriculture (RICA)",
        "Akilah Institute",
        "University of Kigali (UoK)"
    };

    @GetMapping("/institutions")
    public ResponseEntity<Map<String, Object>> testInstitutions() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Institution> institutions = institutionRepository.findAll();
            
            response.put("count", institutions.size());
            response.put("institutions", institutions);
            response.put("status", "success");
            
            // Add sample institutions if none exist
            if (institutions.isEmpty()) {
                response.put("message", "No institutions found in database. You may need to add some.");
                
                // Create sample institutions for testing
                Institution sample1 = new Institution();
                sample1.setName("University of Rwanda");
                sample1.setType("UNIVERSITY");
                sample1.setAddress("Kigali");
                sample1.setContactEmail("info@ur.ac.rw");
                
                Institution sample2 = new Institution();
                sample2.setName("Kigali Institute of Science and Technology");
                sample2.setType("INSTITUTE");
                sample2.setAddress("Kigali");
                sample2.setContactEmail("info@kist.ac.rw");
                
                try {
                    institutionRepository.save(sample1);
                    institutionRepository.save(sample2);
                    response.put("sample_institutions_added", "Added 2 sample institutions for testing");
                } catch (Exception e) {
                    response.put("sample_add_error", e.getMessage());
                }
            }
            
        } catch (Exception e) {
            response.put("status", "error");
            response.put("error", e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/init-institutions")
    public ResponseEntity<Map<String, Object>> initializeInstitutions() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            int added = 0;
            int skipped = 0;
            
            for (String name : INSTITUTIONS) {
                if (institutionRepository.findByName(name).isEmpty()) {
                    try {
                        Institution institution = Institution.builder()
                                .name(name)
                                .type(name.contains("Polytechnic") ? "Polytechnic" : "University")
                                .contactEmail("info@" + name.toLowerCase().replaceAll("[^a-z]", "").replaceAll("\\s+", "") + ".ac.rw")
                                .address("Kigali, Rwanda")
                                .build();
                        institutionRepository.save(institution);
                        added++;
                        response.put("added_" + added, name);
                    } catch (Exception e) {
                        response.put("error_" + name, e.getMessage());
                    }
                } else {
                    skipped++;
                }
            }
            
            long total = institutionRepository.count();
            response.put("status", "success");
            response.put("newly_added", added);
            response.put("skipped_existing", skipped);
            response.put("total_institutions", total);
            response.put("message", "Institution initialization completed");
            
        } catch (Exception e) {
            response.put("status", "error");
            response.put("error", e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }
}
