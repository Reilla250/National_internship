package com.internship.repository;

import com.internship.entity.Supervisor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface SupervisorRepository extends JpaRepository<Supervisor, Long> {
    Optional<Supervisor> findByUser_UserId(Long userId);
    List<Supervisor> findByCompany_CompanyId(Long companyId);
}
