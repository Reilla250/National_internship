package com.internship.controller;

import com.internship.dto.EvaluationDTO.*;
import com.internship.service.EvaluationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/evaluations")
@RequiredArgsConstructor
public class EvaluationController {

    private final EvaluationService evaluationService;

    @PostMapping("/supervisor/{supervisorId}")
    @PreAuthorize("hasAnyRole('SUPERVISOR','COMPANY','ADMIN')")
    public ResponseEntity<Response> evaluate(@PathVariable("supervisorId") Long supervisorId,
                                             @RequestBody CreateRequest req) {
        return ResponseEntity.ok(evaluationService.evaluate(supervisorId, req));
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('STUDENT','SUPERVISOR','INSTITUTION','ADMIN')")
    public ResponseEntity<List<Response>> getByStudent(@PathVariable("studentId") Long studentId) {
        return ResponseEntity.ok(evaluationService.getByStudent(studentId));
    }

    @GetMapping("/supervisor/{supervisorId}")
    @PreAuthorize("hasAnyRole('SUPERVISOR','ADMIN')")
    public ResponseEntity<List<Response>> getBySupervisor(@PathVariable("supervisorId") Long supervisorId) {
        return ResponseEntity.ok(evaluationService.getBySupervisor(supervisorId));
    }
}
