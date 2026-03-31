package com.internship.controller;

import com.internship.dto.ApplicationDTO.CreateRequest;
import com.internship.dto.ApplicationDTO.Response;
import com.internship.dto.ApplicationDTO.StatusUpdate;
import com.internship.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('STUDENT','ADMIN')")
    public ResponseEntity<Response> apply(@PathVariable("studentId") Long studentId,
                                           @RequestBody CreateRequest req) {
        return ResponseEntity.ok(applicationService.apply(studentId, req));
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('STUDENT','ADMIN','INSTITUTION','SUPERVISOR')")
    public ResponseEntity<List<Response>> getByStudent(@PathVariable("studentId") Long studentId) {
        return ResponseEntity.ok(applicationService.getByStudent(studentId));
    }

    @GetMapping("/internship/{internshipId}")
    @PreAuthorize("hasAnyRole('COMPANY','ADMIN','SUPERVISOR')")
    public ResponseEntity<List<Response>> getByInternship(@PathVariable("internshipId") Long internshipId) {
        return ResponseEntity.ok(applicationService.getByInternship(internshipId));
    }

    @GetMapping("/company/{companyId}")
    @PreAuthorize("hasAnyRole('COMPANY','ADMIN')")
    public ResponseEntity<List<Response>> getByCompany(@PathVariable("companyId") Long companyId) {
        return ResponseEntity.ok(applicationService.getByCompany(companyId));
    }

    @PatchMapping("/{applicationId}/status")
    @PreAuthorize("hasAnyRole('COMPANY','ADMIN')")
    public ResponseEntity<Response> updateStatus(@PathVariable("applicationId") Long applicationId,
                                                 @RequestBody StatusUpdate req) {
        return ResponseEntity.ok(applicationService.updateStatus(applicationId, req));
    }
}
