package com.internship.controller;

import com.internship.entity.Student;
import com.internship.service.SupervisorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supervisors")
@RequiredArgsConstructor
public class SupervisorController {

    private final SupervisorService supervisorService;

    @GetMapping("/{supervisorId}/students")
    @PreAuthorize("hasAnyRole('SUPERVISOR','ADMIN')")
    public ResponseEntity<List<Student>> getMyStudents(@PathVariable("supervisorId") Long supervisorId) {
        return ResponseEntity.ok(supervisorService.getStudentsForSupervisor(supervisorId));
    }
}
