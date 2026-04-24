package com.internship.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.JdbcTemplate;
import javax.sql.DataSource;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/database")
public class DatabaseHealthController {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUsername;

    @GetMapping("/health")
    public Map<String, Object> checkDatabaseHealth() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Test database connection
            Connection connection = dataSource.getConnection();
            boolean isConnected = connection != null && !connection.isClosed();
            connection.close();
            
            response.put("status", isConnected ? "CONNECTED" : "DISCONNECTED");
            response.put("database", "TiDB Cloud (MySQL Compatible)");
            response.put("url", dbUrl);
            response.put("username", dbUsername);
            
            if (isConnected) {
                // Test basic query
                try {
                    Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
                    response.put("query_test", result != null ? "SUCCESS" : "FAILED");
                } catch (Exception e) {
                    response.put("query_test", "FAILED: " + e.getMessage());
                }
                
                // Check if tables exist
                try {
                    Integer tableCount = jdbcTemplate.queryForObject(
                        "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE()", 
                        Integer.class
                    );
                    response.put("table_count", tableCount);
                } catch (Exception e) {
                    response.put("table_count_error", e.getMessage());
                }
            }
            
        } catch (Exception e) {
            response.put("status", "ERROR");
            response.put("error", e.getMessage());
            response.put("url", dbUrl);
            response.put("username", dbUsername);
        }
        
        return response;
    }
}
