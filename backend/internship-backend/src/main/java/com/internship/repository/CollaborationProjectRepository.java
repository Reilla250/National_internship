package com.internship.repository;

import com.internship.entity.CollaborationProject;
import com.internship.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CollaborationProjectRepository extends JpaRepository<CollaborationProject, Long> {
    List<CollaborationProject> findByCompany_CompanyId(Long companyId);
    List<CollaborationProject> findByInstitution_InstitutionId(Long institutionId);
    void deleteByCompany(Company company);
    List<CollaborationProject> findByStatus(String status);
}
