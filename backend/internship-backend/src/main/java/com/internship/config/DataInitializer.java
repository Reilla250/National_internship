package com.internship.config;

import com.internship.entity.*;
import com.internship.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

// import java.time.LocalDateTime;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final StudentRepository studentRepository;
    private final CompanyRepository companyRepository;
    private final SupervisorRepository supervisorRepository;
    private final InstitutionRepository institutionRepository;

    @Bean
    public CommandLineRunner initializeData() {
        return args -> {
            try {
                log.info("Initializing system roles and data...");

                roleRepository.findByRoleName("ADMIN").orElseGet(() -> roleRepository.save(new Role(null, "ADMIN")));
                roleRepository.findByRoleName("STUDENT").orElseGet(() -> roleRepository.save(new Role(null, "STUDENT")));
                roleRepository.findByRoleName("COMPANY").orElseGet(() -> roleRepository.save(new Role(null, "COMPANY")));
                roleRepository.findByRoleName("SUPERVISOR").orElseGet(() -> roleRepository.save(new Role(null, "SUPERVISOR")));
                roleRepository.findByRoleName("INSTITUTION").orElseGet(() -> roleRepository.save(new Role(null, "INSTITUTION")));
                roleRepository.findByRoleName("GOVERNMENT").orElseGet(() -> roleRepository.save(new Role(null, "GOVERNMENT")));

                String[] institutions = {
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

                for (String name : institutions) {
                    if (institutionRepository.findByName(name).isEmpty()) {
                        institutionRepository.save(Institution.builder()
                                .name(name)
                                .type(name.contains("Polytechnic") ? "Polytechnic" : "University")
                                .build());
                    }
                }
                
                log.info("System initialized with roles and institutions data.");
            } catch (Exception e) {
                log.warn("Database initialization skipped (connection limit or error): {}", e.getMessage());
            }
        };
    }
}
