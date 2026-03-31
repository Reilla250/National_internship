package com.internship.controller;

import com.internship.dto.ReportDTO.*;
import com.internship.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('STUDENT','ADMIN')")
    public ResponseEntity<Response> submit(@PathVariable("studentId") Long studentId,
                                           @RequestBody CreateRequest req) {
        return ResponseEntity.ok(reportService.submitReport(studentId, req));
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('STUDENT','ADMIN','SUPERVISOR','INSTITUTION')")
    public ResponseEntity<List<Response>> getByStudent(@PathVariable("studentId") Long studentId) {
        return ResponseEntity.ok(reportService.getByStudent(studentId));
    }

    @GetMapping("/internship/{internshipId}")
    @PreAuthorize("hasAnyRole('COMPANY','ADMIN','SUPERVISOR','INSTITUTION')")
    public ResponseEntity<List<Response>> getByInternship(@PathVariable("internshipId") Long internshipId) {
        return ResponseEntity.ok(reportService.getByInternship(internshipId));
    }

    @PatchMapping("/{reportId}/review")
    @PreAuthorize("hasAnyRole('SUPERVISOR','ADMIN','INSTITUTION')")
    public ResponseEntity<Response> review(@PathVariable("reportId") Long reportId,
                                           @RequestBody ApprovalRequest req) {
        return ResponseEntity.ok(reportService.reviewReport(reportId, req));
    }
}
