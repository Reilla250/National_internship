package com.internship.controller;

import com.internship.dto.InternshipDTO.*;
import com.internship.service.InternshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internships")
@RequiredArgsConstructor
public class InternshipController {

    private final InternshipService internshipService;

    @GetMapping
    public ResponseEntity<List<Response>> getAll() {
        return ResponseEntity.ok(internshipService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> getById(@PathVariable Long id) {
        return ResponseEntity.ok(internshipService.getById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Response>> search(
            @RequestParam(required = false) String sector,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String keyword) {
        return ResponseEntity.ok(internshipService.search(sector, location, keyword));
    }

    @GetMapping("/company/{companyId}")
    @PreAuthorize("hasAnyRole('COMPANY','ADMIN')")
    public ResponseEntity<List<Response>> getByCompany(@PathVariable Long companyId) {
        return ResponseEntity.ok(internshipService.getByCompany(companyId));
    }

    @PostMapping("/company/{companyId}")
    @PreAuthorize("hasAnyRole('COMPANY','ADMIN')")
    public ResponseEntity<Response> create(@PathVariable Long companyId,
                                           @RequestBody CreateRequest req) {
        return ResponseEntity.ok(internshipService.create(companyId, req));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('COMPANY','ADMIN')")
    public ResponseEntity<Response> update(@PathVariable Long id,
                                           @RequestBody CreateRequest req) {
        return ResponseEntity.ok(internshipService.update(id, req));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('COMPANY','ADMIN')")
    public ResponseEntity<Response> updateStatus(@PathVariable Long id,
                                                 @RequestParam String status) {
        return ResponseEntity.ok(internshipService.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('COMPANY','ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        internshipService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
