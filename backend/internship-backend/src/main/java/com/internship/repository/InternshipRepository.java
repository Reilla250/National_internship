package com.internship.repository;

import com.internship.entity.Internship;
import com.internship.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InternshipRepository extends JpaRepository<Internship, Long> {
    List<Internship> findByCompany_CompanyId(Long companyId);
    List<Internship> findByCompany(Company company);
    List<Internship> findByStatus(String status);

    @Query("SELECT i FROM Internship i WHERE " +
           "(:sector IS NULL OR :sector = '' OR i.sector = :sector) AND " +
           "(:location IS NULL OR :location = '' OR LOWER(i.location) LIKE LOWER(CONCAT('%',:location,'%'))) AND " +
           "(:keyword IS NULL OR :keyword = '' OR LOWER(i.title) LIKE LOWER(CONCAT('%',:keyword,'%'))) AND " +
           "i.status = 'OPEN'")
    List<Internship> searchInternships(@Param("sector") String sector,
                                       @Param("location") String location,
                                       @Param("keyword") String keyword);

    @Query("SELECT COUNT(i) FROM Internship i WHERE i.status = 'OPEN'")
    long countOpenInternships();

    @Query("SELECT i.sector, COUNT(i) FROM Internship i GROUP BY i.sector")
    List<Object[]> countBySector();
}
