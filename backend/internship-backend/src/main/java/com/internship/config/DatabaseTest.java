package com.internship.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseTest implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        try {
            // Test database connection
            String result = jdbcTemplate.queryForObject("SELECT 'Database connection successful!' as message", String.class);
            System.out.println("=================================");
            System.out.println("CLOUD DATABASE CONNECTION TEST");
            System.out.println("=================================");
            System.out.println("Status: " + result);
            
            // Test if we can query database info
            String dbInfo = jdbcTemplate.queryForObject("SELECT DATABASE() as db_name", String.class);
            System.out.println("Connected to database: " + dbInfo);
            
            // Test if tables exist
            jdbcTemplate.queryForObject("SELECT COUNT(*) FROM roles", Integer.class);
            System.out.println("Tables are accessible and ready!");
            System.out.println("=================================");
            
        } catch (Exception e) {
            System.out.println("=================================");
            System.out.println("DATABASE CONNECTION FAILED");
            System.out.println("=================================");
            System.out.println("Error: " + e.getMessage());
            System.out.println("Please check your database credentials and network connection.");
            System.out.println("=================================");
        }
    }
}
