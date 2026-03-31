package com.internship.controller;

import com.internship.entity.Student;
import com.internship.service.InstitutionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/institution")
@RequiredArgsConstructor
public class InstitutionController {

    private final InstitutionService institutionService;

    @GetMapping
    public ResponseEntity<List<com.internship.entity.Institution>> getAll() {
        return ResponseEntity.ok(institutionService.getAllInstitutions());
    }

    @GetMapping("/{institutionId}/students")
    @PreAuthorize("hasAnyRole('INSTITUTION','ADMIN')")
    public ResponseEntity<List<Student>> getStudents(@PathVariable("institutionId") Long institutionId) {
        return ResponseEntity.ok(institutionService.getStudentsByInstitution(institutionId));
    }

    @GetMapping("/students/all")
    @PreAuthorize("hasAnyRole('INSTITUTION','ADMIN')")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(institutionService.getAllStudents());
    }

    @GetMapping("/{institutionId}/stats")
    @PreAuthorize("hasAnyRole('INSTITUTION','ADMIN')")
    public ResponseEntity<Map<String, Object>> getStats(@PathVariable("institutionId") Long institutionId) {
        return ResponseEntity.ok(institutionService.getInstitutionStats(institutionId));
    }
}
