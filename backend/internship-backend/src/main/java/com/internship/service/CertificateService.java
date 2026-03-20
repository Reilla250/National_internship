package com.internship.service;

import com.internship.dto.CertificateDTO.*;
import com.internship.entity.*;
import com.internship.exception.*;
import com.internship.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CertificateService {

    private final CertificateRepository certificateRepository;
    private final StudentRepository studentRepository;
    private final InternshipRepository internshipRepository;

    @Transactional
    public Response generate(GenerateRequest req) {
        if (certificateRepository.existsByStudent_StudentIdAndInternship_InternshipId(
                req.getStudentId(), req.getInternshipId())) {
            throw new BadRequestException("Certificate already issued for this internship");
        }

        Student student = studentRepository.findById(req.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        Internship internship = internshipRepository.findById(req.getInternshipId())
                .orElseThrow(() -> new ResourceNotFoundException("Internship not found"));

        String certNumber = generateCertNumber(student, internship);
        String verificationCode = UUID.randomUUID().toString().replace("-", "").substring(0, 16).toUpperCase();

        Certificate cert = Certificate.builder()
                .student(student)
                .internship(internship)
                .issueDate(LocalDate.now())
                .certificateNumber(certNumber)
                .verificationCode(verificationCode)
                .issuedBy("National Digital Internship Management System")
                .build();

        return toResponse(certificateRepository.save(cert));
    }

    public List<Response> getByStudent(Long studentId) {
        return certificateRepository.findByStudent_StudentId(studentId)
                .stream().map(this::toResponse).toList();
    }

    public Response verify(String verificationCode) {
        Certificate cert = certificateRepository.findByVerificationCode(verificationCode)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate not found or invalid"));
        return toResponse(cert);
    }

    private String generateCertNumber(Student student, Internship internship) {
        String year = DateTimeFormatter.ofPattern("yyyy").format(LocalDate.now());
        String studentPart = String.format("%04d", student.getStudentId());
        String internPart  = String.format("%04d", internship.getInternshipId());
        return "CERT-" + year + "-" + studentPart + "-" + internPart;
    }

    private Response toResponse(Certificate c) {
        Response r = new Response();
        r.setCertificateId(c.getCertificateId());
        r.setStudentName(c.getStudent().getFirstName() + " " + c.getStudent().getLastName());
        r.setInternshipTitle(c.getInternship().getTitle());
        r.setCompanyName(c.getInternship().getCompany().getCompanyName());
        r.setIssueDate(c.getIssueDate());
        r.setCertificateNumber(c.getCertificateNumber());
        r.setVerificationCode(c.getVerificationCode());
        r.setIssuedBy(c.getIssuedBy());
        return r;
    }
}
