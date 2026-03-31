package com.internship.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class DatabaseCheckController {

    private final JdbcTemplate jdbcTemplate;

    @GetMapping("/db")
    public ResponseEntity<Map<String, Object>> checkConnection() {
        Map<String, Object> response = new HashMap<>();
        try {
            String dbName = jdbcTemplate.queryForObject("SELECT DATABASE()", String.class);
            response.put("status", "SUCCESS");
            response.put("message", "Database connection is active and permanent.");
            response.put("database", dbName);
            response.put("timestamp", java.time.LocalDateTime.now().toString());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", "ERROR");
            response.put("message", "Failed to connect to the database.");
            response.put("error", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
