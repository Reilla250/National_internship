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
    public List<User> getAllUsers() {
        return adminService.getAllUsers();
    }

    @PostMapping("/users")
    public ResponseEntity<AuthResponse> createUser(@Valid @RequestBody RegisterRequest req) {
        return ResponseEntity.ok(authService.registerAdmin(req));
    }

    @PatchMapping("/users/{userId}/status")
    public void setUserStatus(@PathVariable("userId") Long userId,
                              @RequestParam("status") String status) {
        adminService.setUserStatus(userId, status);
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable("userId") Long userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/companies")
    public List<com.internship.entity.Company> getCompanies() {
        return adminService.getAllCompanies();
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        return adminService.getSystemStats();
    }

    @PatchMapping("/students/{studentId}/assign-supervisor")
    public ResponseEntity<Void> assignSupervisorToStudent(
            @PathVariable Long studentId,
            @RequestParam Long supervisorId) {
        adminService.assignSupervisorToStudent(studentId, supervisorId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/supervisors")
    public ResponseEntity<List<?>> getAllSupervisors() {
        return ResponseEntity.ok(adminService.getAllSupervisors());
    }

    @GetMapping("/students")
    public ResponseEntity<List<?>> getAllStudents() {
        return ResponseEntity.ok(adminService.getAllStudents());
    }
}
