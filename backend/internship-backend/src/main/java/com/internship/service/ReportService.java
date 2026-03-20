package com.internship.service;

import com.internship.dto.ReportDTO.*;
import com.internship.entity.*;
import com.internship.exception.*;
import com.internship.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final StudentRepository studentRepository;
    private final InternshipRepository internshipRepository;

    @Transactional
    public Response submitReport(Long studentId, CreateRequest req) {
        if (reportRepository.existsByStudent_StudentIdAndInternship_InternshipIdAndWeekNumber(
                studentId, req.getInternshipId(), req.getWeekNumber())) {
            throw new BadRequestException("Report for week " + req.getWeekNumber() + " already submitted");
        }

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        Internship internship = internshipRepository.findById(req.getInternshipId())
                .orElseThrow(() -> new ResourceNotFoundException("Internship not found"));

        Report report = Report.builder()
                .student(student)
                .internship(internship)
                .weekNumber(req.getWeekNumber())
                .reportContent(req.getReportContent())
                .approvalStatus("PENDING")
                .build();

        return toResponse(reportRepository.save(report));
    }

    public List<Response> getByStudent(Long studentId) {
        return reportRepository.findByStudent_StudentId(studentId)
                .stream().map(this::toResponse).toList();
    }

    public List<Response> getByInternship(Long internshipId) {
        return reportRepository.findByInternship_InternshipId(internshipId)
                .stream().map(this::toResponse).toList();
    }

    @Transactional
    public Response reviewReport(Long reportId, ApprovalRequest req) {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found"));
        report.setApprovalStatus(req.getApprovalStatus());
        report.setSupervisorNotes(req.getSupervisorNotes());
        return toResponse(reportRepository.save(report));
    }

    private Response toResponse(Report r) {
        Response res = new Response();
        res.setReportId(r.getReportId());
        res.setStudentId(r.getStudent().getStudentId());
        res.setStudentName(r.getStudent().getFirstName() + " " + r.getStudent().getLastName());
        res.setInternshipId(r.getInternship().getInternshipId());
        res.setInternshipTitle(r.getInternship().getTitle());
        res.setWeekNumber(r.getWeekNumber());
        res.setReportContent(r.getReportContent());
        res.setSubmissionDate(r.getSubmissionDate());
        res.setApprovalStatus(r.getApprovalStatus());
        res.setSupervisorNotes(r.getSupervisorNotes());
        return res;
    }
}
