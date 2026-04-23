package com.internship.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * SECURITY CONFIGURATION - DEMO ACCOUNT PREVENTION
 * 
 * IMPORTANT: This system is configured for PRODUCTION USE ONLY.
 * 
 * DEMO ACCOUNTS ARE PERMANENTLY DISABLED:
 * - No hardcoded demo accounts exist in the system
 * - No default credentials are provided anywhere
 * - All user accounts must be created through registration process
 * 
 * SECURITY MEASURES:
 * - All passwords are BCrypt hashed
 * - No test/demo accounts in initialization
 * - Registration required for all access
 * 
 * ⚠️  WARNING: Never add demo accounts to this system
 * This is a production-ready internship management system
 */
@Configuration
@Component
public class SecurityConfiguration {

    /**
     * Password encoder for secure password hashing
     * Uses BCrypt with default strength (10)
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
    }

    /**
     * Security validation constants
     * These values are used throughout the system to ensure security
     */
    public static class SecurityConstants {
        public static final int MIN_PASSWORD_LENGTH = 8;
        public static final String PASSWORD_PATTERN = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$";
        public static final String EMAIL_PATTERN = "^[A-Za-z0-9+._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        
        // Demo account prevention constants
        public static final boolean DEMO_ACCOUNTS_ENABLED = false;
        public static final String[] BLOCKED_DEMO_DOMAINS = {
            "demo@internship.com",
            "test@internship.com", 
            "admin@internship.com",
            "student@internship.com",
            "company@internship.com",
            "supervisor@internship.com",
            "institution@internship.com",
            "government@internship.com"
        };
    }
}
