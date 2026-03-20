package com.internship.service;

import com.internship.dto.ApplicationDTO.*;
import com.internship.entity.*;
import com.internship.exception.*;
import com.internship.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final StudentRepository studentRepository;
    private final InternshipRepository internshipRepository;

    @Transactional
    public Response apply(Long studentId, CreateRequest req) {
        if (applicationRepository.existsByStudent_StudentIdAndInternship_InternshipId(
                studentId, req.getInternshipId())) {
            throw new BadRequestException("Already applied to this internship");
        }

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        Internship internship = internshipRepository.findById(req.getInternshipId())
                .orElseThrow(() -> new ResourceNotFoundException("Internship not found"));

        if (!"OPEN".equals(internship.getStatus())) {
            throw new BadRequestException("Internship is not open for applications");
        }

        Application app = Application.builder()
                .student(student)
                .internship(internship)
                .coverLetter(req.getCoverLetter())
                .status("PENDING")
                .build();

        return toResponse(applicationRepository.save(app));
    }

    public List<Response> getByStudent(Long studentId) {
        return applicationRepository.findByStudent_StudentId(studentId)
                .stream().map(this::toResponse).toList();
    }

    public List<Response> getByInternship(Long internshipId) {
        return applicationRepository.findByInternship_InternshipId(internshipId)
                .stream().map(this::toResponse).toList();
    }

    public List<Response> getByCompany(Long companyId) {
        return applicationRepository.findByCompanyId(companyId)
                .stream().map(this::toResponse).toList();
    }

    @Transactional
    public Response updateStatus(Long applicationId, StatusUpdate req) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));
        app.setStatus(req.getStatus());
        app.setRemarks(req.getRemarks());
        return toResponse(applicationRepository.save(app));
    }

    private Response toResponse(Application a) {
        Response r = new Response();
        r.setApplicationId(a.getApplicationId());
        r.setStudentId(a.getStudent().getStudentId());
        r.setStudentName(a.getStudent().getFirstName() + " " + a.getStudent().getLastName());
        r.setInternshipId(a.getInternship().getInternshipId());
        r.setInternshipTitle(a.getInternship().getTitle());
        r.setCompanyName(a.getInternship().getCompany().getCompanyName());
        r.setApplicationDate(a.getApplicationDate());
        r.setStatus(a.getStatus());
        r.setCoverLetter(a.getCoverLetter());
        r.setRemarks(a.getRemarks());
        return r;
    }
}
