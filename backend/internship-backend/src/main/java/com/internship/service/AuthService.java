package com.internship.service;

import com.internship.dto.AuthDTO.*;
import com.internship.entity.*;
import com.internship.exception.BadRequestException;
import com.internship.exception.ResourceNotFoundException;
import com.internship.repository.*;
import com.internship.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final StudentRepository studentRepository;
    private final CompanyRepository companyRepository;
    private final SupervisorRepository supervisorRepository;
    private final InstitutionRepository institutionRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        return registerInternal(req, true);
    }

    @Transactional
    public AuthResponse registerAdmin(RegisterRequest req) {
        return registerInternal(req, false);
    }

    private AuthResponse registerInternal(RegisterRequest req, boolean isPublic) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new BadRequestException("Email already in use: " + req.getEmail());
        }

        // Restrict public registration to STUDENT role only
        if (isPublic && !"STUDENT".equals(req.getRoleName())) {
            throw new BadRequestException("Public registration is only available for STUDENT role.");
        }

        Role role = roleRepository.findByRoleName(req.getRoleName())
                .orElseThrow(() -> new BadRequestException("Invalid role: " + req.getRoleName()));

        User user = User.builder()
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .role(role)
                .status("ACTIVE")
                .build();
        userRepository.save(user);

        Long profileId = createProfile(req, role.getRoleName(), user);
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        return new AuthResponse(token, user.getEmail(), role.getRoleName(), profileId);
    }

    public AuthResponse login(LoginRequest req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));

        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!"ACTIVE".equals(user.getStatus())) {
            throw new BadRequestException("Account is not active");
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        Long profileId = resolveProfileId(user);
        return new AuthResponse(token, user.getEmail(), user.getRole().getRoleName(), profileId);
    }

    private Long createProfile(RegisterRequest req, String roleName, User user) {
        return switch (roleName) {
            case "STUDENT" -> {
                Institution inst = req.getInstitutionId() != null
                        ? institutionRepository.findById(req.getInstitutionId()).orElse(null)
                        : null;
                Student s = Student.builder()
                        .user(user)
                        .firstName(req.getFirstName())
                        .lastName(req.getLastName())
                        .institution(inst)
                        .program(req.getProgram())
                        .build();
                yield studentRepository.save(s).getStudentId();
            }
            case "COMPANY" -> {
                Company c = Company.builder()
                        .user(user)
                        .companyName(req.getCompanyName())
                        .build();
                yield companyRepository.save(c).getCompanyId();
            }
            case "SUPERVISOR" -> {
                Company comp = req.getCompanyId() != null
                        ? companyRepository.findById(req.getCompanyId()).orElse(null)
                        : null;
                Supervisor sv = Supervisor.builder()
                        .user(user)
                        .firstName(req.getFirstName())
                        .lastName(req.getLastName())
                        .company(comp)
                        .build();
                yield supervisorRepository.save(sv).getSupervisorId();
            }
            default -> null;
        };
    }

    private Long resolveProfileId(User user) {
        return switch (user.getRole().getRoleName()) {
            case "STUDENT"    -> studentRepository.findByUser_UserId(user.getUserId())
                                    .map(Student::getStudentId).orElse(null);
            case "COMPANY"    -> companyRepository.findByUser_UserId(user.getUserId())
                                    .map(Company::getCompanyId).orElse(null);
            case "SUPERVISOR" -> supervisorRepository.findByUser_UserId(user.getUserId())
                                    .map(Supervisor::getSupervisorId).orElse(null);
            default           -> null;
        };
    }
}
