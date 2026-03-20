package com.internship.controller;

import com.internship.dto.CollaborationProjectDTO.*;
import com.internship.service.CollaborationProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/collaborations")
@RequiredArgsConstructor
public class CollaborationProjectController {

    private final CollaborationProjectService service;

    @GetMapping
    public ResponseEntity<List<Response>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<Response>> getByCompany(@PathVariable Long companyId) {
        return ResponseEntity.ok(service.getByCompany(companyId));
    }

    @GetMapping("/institution/{institutionId}")
    public ResponseEntity<List<Response>> getByInstitution(@PathVariable Long institutionId) {
        return ResponseEntity.ok(service.getByInstitution(institutionId));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('COMPANY','INSTITUTION','ADMIN')")
    public ResponseEntity<Response> create(@RequestBody CreateRequest req) {
        return ResponseEntity.ok(service.create(req));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('COMPANY','INSTITUTION','ADMIN')")
    public ResponseEntity<Response> updateStatus(@PathVariable Long id,
                                                  @RequestParam String status,
                                                  @RequestParam(required = false) String outcomes) {
        return ResponseEntity.ok(service.updateStatus(id, status, outcomes));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
