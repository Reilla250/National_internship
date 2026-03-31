package com.internship.service;

import com.internship.dto.ApplicationDTO.CreateRequest;
import com.internship.dto.ApplicationDTO.Response;
import com.internship.dto.ApplicationDTO.StatusUpdate;
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
    private final NotificationService notificationService;

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

        Application savedApp = applicationRepository.save(app);

        // Notify Company
        String companyEmail = internship.getCompany().getUser().getEmail();
        String msgCompany = "New application from " + student.getFirstName() + " " + student.getLastName() + " for " + internship.getTitle();
        notificationService.createNotification(companyEmail, msgCompany, "info");

        // Notify Student
        notificationService.createNotification(student.getUser().getEmail(), 
            "Successfully applied for " + internship.getTitle() + " at " + internship.getCompany().getCompanyName(), "success");

        return toResponse(savedApp);
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

        Application updatedApp = applicationRepository.save(app);

        // Notify Student
        String studentEmail = app.getStudent().getUser().getEmail();
        String msg = "Your application for " + app.getInternship().getTitle() + " has been marked as " + req.getStatus();
        String type = "REJECTED".equals(req.getStatus()) ? "danger" : 
                      ("ACCEPTED".equals(req.getStatus()) ? "success" : "info");
        notificationService.createNotification(studentEmail, msg, type);

        return toResponse(updatedApp);
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
        
        // Populate student info
        Student s = a.getStudent();
        r.setStudentPhone(s.getPhone());
        r.setStudentProgram(s.getProgram());
        r.setStudentRegistrationNumber(s.getRegistrationNumber());
        if (s.getInstitution() != null) {
            r.setStudentInstitution(s.getInstitution().getName());
        }
        
        return r;
    }
}
