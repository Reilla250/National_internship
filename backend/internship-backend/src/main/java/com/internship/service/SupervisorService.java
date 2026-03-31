package com.internship.service;

import com.internship.entity.Student;
import com.internship.entity.Supervisor;
import com.internship.exception.ResourceNotFoundException;
import com.internship.repository.StudentRepository;
import com.internship.repository.SupervisorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SupervisorService {

    private final SupervisorRepository supervisorRepository;
    private final StudentRepository studentRepository;

    public List<Student> getStudentsForSupervisor(Long supervisorId) {
        Supervisor supervisor = supervisorRepository.findById(supervisorId)
                .orElseThrow(() -> new ResourceNotFoundException("Supervisor not found"));

        if (supervisor.getInstitution() != null) {
            return studentRepository.findByInstitution_InstitutionId(supervisor.getInstitution().getInstitutionId());
        }
        
        return Collections.emptyList();
    }
}
