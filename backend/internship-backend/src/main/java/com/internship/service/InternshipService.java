package com.internship.service;

import com.internship.dto.InternshipDTO.*;
import com.internship.entity.*;
import com.internship.exception.*;
import com.internship.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@lombok.extern.slf4j.Slf4j
public class InternshipService {

    private final InternshipRepository internshipRepository;
    private final CompanyRepository companyRepository;
    private final NotificationRepository notificationRepository;
    private final StudentRepository studentRepository;

    @Transactional
    public Response create(Long companyId, CreateRequest req) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));

        Internship internship = Internship.builder()
                .company(company)
                .title(req.getTitle())
                .description(req.getDescription())
                .requiredSkills(req.getRequiredSkills())
                .location(req.getLocation())
                .sector(req.getSector())
                .startDate(req.getStartDate())
                .endDate(req.getEndDate())
                .slots(req.getSlots() != null ? req.getSlots() : 1)
                .status("OPEN")
                .build();

        Internship savedInternship = internshipRepository.save(internship);

        // Notify all students about the new internship
        List<Student> students = studentRepository.findAll();
        List<Notification> notifications = students.stream().map(student -> Notification.builder()
                .recipient(student.getUser())
                .title("New Internship Published")
                .message(String.format("New Internship Published: %s by %s", savedInternship.getTitle(), company.getCompanyName()))
                .type("INFO")
                .status("UNREAD")
                .build()).toList();
        notificationRepository.saveAll(notifications);

        return toResponse(savedInternship);
    }

    public List<Response> getAll() {
        return internshipRepository.findAll().stream().map(this::toResponse).toList();
    }

    public List<Response> getByCompany(Long companyId) {
        return internshipRepository.findByCompany_CompanyId(companyId)
                .stream().map(this::toResponse).toList();
    }

    public Response getById(Long id) {
        return toResponse(internshipRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Internship not found: " + id)));
    }

    public List<Response> search(String sector, String location, String keyword) {
        return internshipRepository.searchInternships(sector, location, keyword)
                .stream().map(this::toResponse).toList();
    }

    @Transactional
    public Response update(Long id, CreateRequest req) {
        log.info("Updating internship {}: {}", id, req);
        Internship i = internshipRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Internship not found"));
        
        i.setTitle(req.getTitle());
        i.setDescription(req.getDescription());
        i.setRequiredSkills(req.getRequiredSkills());
        i.setLocation(req.getLocation());
        i.setSector(req.getSector());
        i.setStartDate(req.getStartDate());
        i.setEndDate(req.getEndDate());
        if (req.getSlots() != null) i.setSlots(req.getSlots());
        
        Internship saved = internshipRepository.saveAndFlush(i);
        log.info("Internship {} updated successfully", id);
        return toResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        if (!internshipRepository.existsById(id))
            throw new ResourceNotFoundException("Internship not found");
        internshipRepository.deleteById(id);
    }

    @Transactional
    public Response updateStatus(Long id, String status) {
        Internship i = internshipRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Internship not found"));
        i.setStatus(status);
        return toResponse(internshipRepository.save(i));
    }

    private Response toResponse(Internship i) {
        Response r = new Response();
        r.setInternshipId(i.getInternshipId());
        r.setCompanyId(i.getCompany().getCompanyId());
        r.setCompanyName(i.getCompany().getCompanyName());
        r.setIndustrySector(i.getCompany().getIndustrySector());
        r.setTitle(i.getTitle());
        r.setDescription(i.getDescription());
        r.setRequiredSkills(i.getRequiredSkills());
        r.setLocation(i.getLocation());
        r.setSector(i.getSector());
        r.setStartDate(i.getStartDate());
        r.setEndDate(i.getEndDate());
        r.setSlots(i.getSlots());
        r.setStatus(i.getStatus());
        return r;
    }
}
