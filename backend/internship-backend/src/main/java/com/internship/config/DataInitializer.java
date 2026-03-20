package com.internship.config;

import com.internship.entity.*;
import com.internship.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Bean
    public CommandLineRunner initializeData() {
        return args -> {
            if (userRepository.count() == 0) {
                log.info("Initializing demo data...");
                
                // Create roles if they don't exist
                roleRepository.findByRoleName("ADMIN").orElseGet(() -> roleRepository.save(new Role(null, "ADMIN")));
                roleRepository.findByRoleName("STUDENT").orElseGet(() -> roleRepository.save(new Role(null, "STUDENT")));
                roleRepository.findByRoleName("COMPANY").orElseGet(() -> roleRepository.save(new Role(null, "COMPANY")));
                roleRepository.findByRoleName("SUPERVISOR").orElseGet(() -> roleRepository.save(new Role(null, "SUPERVISOR")));
                roleRepository.findByRoleName("INSTITUTION").orElseGet(() -> roleRepository.save(new Role(null, "INSTITUTION")));
                roleRepository.findByRoleName("GOVERNMENT").orElseGet(() -> roleRepository.save(new Role(null, "GOVERNMENT")));

                Role adminRole = roleRepository.findByRoleName("ADMIN").get();

                // Create admin user if not exists
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
                
                log.info("System initialized with clean database state (Roles and Admin only).");
            }
        };
    }
}
