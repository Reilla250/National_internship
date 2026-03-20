package com.internship.service;

import com.internship.dto.CollaborationProjectDTO.*;
import com.internship.entity.*;
import com.internship.exception.*;
import com.internship.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CollaborationProjectService {

    private final CollaborationProjectRepository projectRepository;
    private final CompanyRepository companyRepository;
    private final InstitutionRepository institutionRepository;

    @Transactional
    public Response create(CreateRequest req) {
        Company company = req.getCompanyId() != null
                ? companyRepository.findById(req.getCompanyId()).orElseThrow(() -> new ResourceNotFoundException("Company not found"))
                : null;
        Institution institution = req.getInstitutionId() != null
                ? institutionRepository.findById(req.getInstitutionId()).orElseThrow(() -> new ResourceNotFoundException("Institution not found"))
                : null;

        CollaborationProject p = CollaborationProject.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .company(company)
                .institution(institution)
                .startDate(req.getStartDate())
                .endDate(req.getEndDate())
                .status("ACTIVE")
                .build();

        return toResponse(projectRepository.save(p));
    }

    public List<Response> getAll() {
        return projectRepository.findAll().stream().map(this::toResponse).toList();
    }

    public List<Response> getByCompany(Long companyId) {
        return projectRepository.findByCompany_CompanyId(companyId).stream().map(this::toResponse).toList();
    }

    public List<Response> getByInstitution(Long institutionId) {
        return projectRepository.findByInstitution_InstitutionId(institutionId).stream().map(this::toResponse).toList();
    }

    public Response getById(Long id) {
        return toResponse(projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found: " + id)));
    }

    @Transactional
    public Response updateStatus(Long id, String status, String outcomes) {
        CollaborationProject p = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        p.setStatus(status);
        if (outcomes != null) p.setOutcomes(outcomes);
        return toResponse(projectRepository.save(p));
    }

    @Transactional
    public void delete(Long id) {
        if (!projectRepository.existsById(id)) throw new ResourceNotFoundException("Project not found");
        projectRepository.deleteById(id);
    }

    private Response toResponse(CollaborationProject p) {
        Response r = new Response();
        r.setProjectId(p.getProjectId());
        r.setTitle(p.getTitle());
        r.setDescription(p.getDescription());
        r.setCompanyName(p.getCompany() != null ? p.getCompany().getCompanyName() : null);
        r.setInstitutionName(p.getInstitution() != null ? p.getInstitution().getName() : null);
        r.setStartDate(p.getStartDate());
        r.setEndDate(p.getEndDate());
        r.setStatus(p.getStatus());
        r.setOutcomes(p.getOutcomes());
        return r;
    }
}
