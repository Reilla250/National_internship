package com.internship.repository;

import com.internship.entity.InstitutionStaff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InstitutionStaffRepository extends JpaRepository<InstitutionStaff, Long> {
    Optional<InstitutionStaff> findByUser_UserId(Long userId);
}
