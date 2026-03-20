package com.internship.controller;

import com.internship.dto.CertificateDTO.*;
import com.internship.service.CertificateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/certificates")
@RequiredArgsConstructor
public class CertificateController {

    private final CertificateService certificateService;

    @PostMapping("/generate")
    @PreAuthorize("hasAnyRole('INSTITUTION','ADMIN')")
    public ResponseEntity<Response> generate(@RequestBody GenerateRequest req) {
        return ResponseEntity.ok(certificateService.generate(req));
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('STUDENT','INSTITUTION','ADMIN')")
    public ResponseEntity<List<Response>> getByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(certificateService.getByStudent(studentId));
    }

    @GetMapping("/verify/{verificationCode}")
    public ResponseEntity<Response> verify(@PathVariable String verificationCode) {
        return ResponseEntity.ok(certificateService.verify(verificationCode));
    }
}
