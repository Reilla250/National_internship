package com.internship.controller;

import com.internship.dto.AuthDTO.AuthResponse;
import com.internship.dto.AuthDTO.RegisterRequest;
import com.internship.entity.User;
import com.internship.service.AdminService;
import com.internship.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;
    private final AuthService authService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PostMapping("/users")
    public ResponseEntity<AuthResponse> createUser(@Valid @RequestBody RegisterRequest req) {
        return ResponseEntity.ok(authService.registerAdmin(req));
    }

    @PatchMapping("/users/{userId}/status")
    public ResponseEntity<User> setUserStatus(@PathVariable Long userId,
                                               @RequestParam String status) {
        return ResponseEntity.ok(adminService.setUserStatus(userId, status));
    }

    @GetMapping("/companies")
    public ResponseEntity<List<com.internship.entity.Company>> getAllCompanies() {
        return ResponseEntity.ok(adminService.getAllCompanies());
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getSystemStats() {
        return ResponseEntity.ok(adminService.getSystemStats());
    }
}
