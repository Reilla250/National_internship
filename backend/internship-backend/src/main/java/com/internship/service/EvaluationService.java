package com.internship.service;

import com.internship.dto.EvaluationDTO.*;
import com.internship.entity.*;
import com.internship.exception.*;
import com.internship.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EvaluationService {

    private final EvaluationRepository evaluationRepository;
    private final StudentRepository studentRepository;
    private final SupervisorRepository supervisorRepository;
    private final InternshipRepository internshipRepository;

    @Transactional
    public Response evaluate(Long supervisorId, CreateRequest req) {
        Student student = studentRepository.findById(req.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        Supervisor supervisor = supervisorRepository.findById(supervisorId)
                .orElseThrow(() -> new ResourceNotFoundException("Supervisor not found"));
        Internship internship = internshipRepository.findById(req.getInternshipId())
                .orElseThrow(() -> new ResourceNotFoundException("Internship not found"));

        Evaluation eval = Evaluation.builder()
                .student(student)
                .supervisor(supervisor)
                .internship(internship)
                .performanceScore(req.getPerformanceScore())
                .technicalScore(req.getTechnicalScore())
                .communicationScore(req.getCommunicationScore())
                .teamworkScore(req.getTeamworkScore())
                .comments(req.getComments())
                .build();

        return toResponse(evaluationRepository.save(eval));
    }

    public List<Response> getByStudent(Long studentId) {
        return evaluationRepository.findByStudent_StudentId(studentId)
                .stream().map(this::toResponse).toList();
    }

    public List<Response> getBySupervisor(Long supervisorId) {
        return evaluationRepository.findBySupervisor_SupervisorId(supervisorId)
                .stream().map(this::toResponse).toList();
    }

    private Response toResponse(Evaluation e) {
        Response r = new Response();
        r.setEvaluationId(e.getEvaluationId());
        r.setStudentId(e.getStudent().getStudentId());
        r.setStudentName(e.getStudent().getFirstName() + " " + e.getStudent().getLastName());
        r.setInternshipId(e.getInternship().getInternshipId());
        r.setInternshipTitle(e.getInternship().getTitle());
        r.setPerformanceScore(e.getPerformanceScore());
        r.setTechnicalScore(e.getTechnicalScore());
        r.setCommunicationScore(e.getCommunicationScore());
        r.setTeamworkScore(e.getTeamworkScore());
        r.setComments(e.getComments());
        r.setEvaluationDate(e.getEvaluationDate());

        // Calculate average
        BigDecimal sum = BigDecimal.ZERO;
        int count = 0;
        for (BigDecimal score : new BigDecimal[]{
                e.getPerformanceScore(), e.getTechnicalScore(),
                e.getCommunicationScore(), e.getTeamworkScore()}) {
            if (score != null) { sum = sum.add(score); count++; }
        }
        r.setAverageScore(count > 0 ? sum.divide(BigDecimal.valueOf(count), 2, RoundingMode.HALF_UP) : null);
        return r;
    }
}
