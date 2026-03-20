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
@PreAuthorize("hasAnyRole('INSTITUTION','ADMIN')")
public class InstitutionController {

    private final InstitutionService institutionService;

    @GetMapping("/{institutionId}/students")
    public ResponseEntity<List<Student>> getStudents(@PathVariable Long institutionId) {
        return ResponseEntity.ok(institutionService.getStudentsByInstitution(institutionId));
    }

    @GetMapping("/{institutionId}/stats")
    public ResponseEntity<Map<String, Object>> getStats(@PathVariable Long institutionId) {
        return ResponseEntity.ok(institutionService.getInstitutionStats(institutionId));
    }
}
