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
            log.info("Checking demo data...");

                roleRepository.findByRoleName("ADMIN").orElseGet(() -> roleRepository.save(new Role(null, "ADMIN")));
                roleRepository.findByRoleName("STUDENT").orElseGet(() -> roleRepository.save(new Role(null, "STUDENT")));
                roleRepository.findByRoleName("COMPANY").orElseGet(() -> roleRepository.save(new Role(null, "COMPANY")));
                roleRepository.findByRoleName("SUPERVISOR").orElseGet(() -> roleRepository.save(new Role(null, "SUPERVISOR")));
                roleRepository.findByRoleName("INSTITUTION").orElseGet(() -> roleRepository.save(new Role(null, "INSTITUTION")));
                roleRepository.findByRoleName("GOVERNMENT").orElseGet(() -> roleRepository.save(new Role(null, "GOVERNMENT")));

                Role adminRole = roleRepository.findByRoleName("ADMIN").get();

                if (userRepository.findByEmail("admin@internship.com").isEmpty()) {
                    User adminUser = User.builder()
                            .email("admin@internship.com")
                            .password(passwordEncoder.encode("admin123"))
                            .role(adminRole)
                            .status("ACTIVE")
                            .build();
                    userRepository.save(adminUser);
                    log.info("Admin account created: admin@internship.com / admin123");
                }

                if (userRepository.findByEmail("student@internship.com").isEmpty()) {
                    Role studentRole = roleRepository.findByRoleName("STUDENT").get();
                    User studentUser = userRepository.save(User.builder()
                            .email("student@internship.com")
                            .password(passwordEncoder.encode("student123"))
                            .role(studentRole)
                            .status("ACTIVE")
                            .build());
                    studentRepository.save(Student.builder()
                            .user(studentUser)
                            .firstName("John")
                            .lastName("Doe")
                            .program("Computer Science")
                            .build());
                    log.info("Student account created: student@internship.com / student123");
                }
                if (userRepository.findByEmail("company@internship.com").isEmpty()) {
                    Role companyRole = roleRepository.findByRoleName("COMPANY").get();
                    User companyUser = userRepository.save(User.builder()
                            .email("company@internship.com")
                            .password(passwordEncoder.encode("company123"))
                            .role(companyRole)
                            .status("ACTIVE")
                            .build());
                    companyRepository.save(Company.builder()
                            .user(companyUser)
                            .companyName("TechCorp Solutions")
                            .build());
                    log.info("Company account created: company@internship.com / company123");
                }
                if (userRepository.findByEmail("supervisor@internship.com").isEmpty()) {
                    Role supervisorRole = roleRepository.findByRoleName("SUPERVISOR").get();
                    User supervisorUser = userRepository.save(User.builder()
                            .email("supervisor@internship.com")
                            .password(passwordEncoder.encode("supervisor123"))
                            .role(supervisorRole)
                            .status("ACTIVE")
                            .build());
                    supervisorRepository.save(Supervisor.builder()
                            .user(supervisorUser)
                            .firstName("Jane")
                            .lastName("Smith")
                            .build());
                    log.info("Supervisor account created: supervisor@internship.com / supervisor123");
                }

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

                if (userRepository.findByEmail("institution@internship.com").isEmpty()) {
                    Role institutionRole = roleRepository.findByRoleName("INSTITUTION").get();
                    userRepository.save(User.builder()
                            .email("institution@internship.com")
                            .password(passwordEncoder.encode("institution123"))
                            .role(institutionRole)
                            .status("ACTIVE")
                            .build());
                    log.info("Institution account created: institution@internship.com / institution123");
                }

                // Create government demo
                if (userRepository.findByEmail("government@internship.com").isEmpty()) {
                    Role governmentRole = roleRepository.findByRoleName("GOVERNMENT").get();
                    userRepository.save(User.builder()
                            .email("government@internship.com")
                            .password(passwordEncoder.encode("government123"))
                            .role(governmentRole)
                            .status("ACTIVE")
                            .build());
                    log.info("Government account created: government@internship.com / government123");
                }
                
                log.info("System initialized with demo accounts and data.");
        };
    }
}
