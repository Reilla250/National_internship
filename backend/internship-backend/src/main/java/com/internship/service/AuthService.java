package com.internship.service;

import com.internship.dto.AuthDTO.*;
import com.internship.entity.*;
import com.internship.exception.BadRequestException;
import com.internship.exception.ResourceNotFoundException;
import com.internship.repository.*;
import com.internship.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final StudentRepository studentRepository;
    private final CompanyRepository companyRepository;
    private final SupervisorRepository supervisorRepository;
    private final InstitutionRepository institutionRepository;
    private final InstitutionStaffRepository institutionStaffRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final NotificationService notificationService;
    private final EmailService emailService;

    public AuthService(UserRepository userRepository, RoleRepository roleRepository,
                       StudentRepository studentRepository, CompanyRepository companyRepository,
                       SupervisorRepository supervisorRepository, InstitutionRepository institutionRepository,
                       InstitutionStaffRepository institutionStaffRepository,
                       PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil, UserDetailsService userDetailsService,
                       NotificationService notificationService, EmailService emailService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.studentRepository = studentRepository;
        this.companyRepository = companyRepository;
        this.supervisorRepository = supervisorRepository;
        this.institutionRepository = institutionRepository;
        this.institutionStaffRepository = institutionStaffRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.notificationService = notificationService;
        this.emailService = emailService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        return registerInternal(req, true);
    }

    @Transactional
    public AuthResponse registerAdmin(RegisterRequest req) {
        return registerInternal(req, false);
    }

    private AuthResponse registerInternal(RegisterRequest req, boolean isPublic) {
        log.info("Incoming registration request: email={}, registrationNumber={}, role={}", 
            req.getEmail(), req.getRegistrationNumber(), req.getRoleName());
        
        User user = null;
        Role role = null;
        Long profileId = null;
        
        try {
            // Validation checks
            if (userRepository.existsByEmail(req.getEmail())) {
                throw new BadRequestException("Email already in use: " + req.getEmail());
            }

            if (req.getRegistrationNumber() != null && studentRepository.existsByRegistrationNumber(req.getRegistrationNumber())) {
                Student existing = studentRepository.findByRegistrationNumber(req.getRegistrationNumber()).orElse(null);
                String owner = (existing != null && existing.getUser() != null) ? existing.getUser().getEmail() : "unknown";
                throw new BadRequestException("Registration number " + req.getRegistrationNumber() + " is already used by: " + owner);
            }

            // Restrict public registration
            if (isPublic && !java.util.List.of("STUDENT", "COMPANY", "INSTITUTION").contains(req.getRoleName())) {
                throw new BadRequestException("Public registration is not available for this role.");
            }

            // Create user and profile
            role = roleRepository.findByRoleName(req.getRoleName())
                    .orElseThrow(() -> new BadRequestException("Invalid role: " + req.getRoleName()));

            user = User.builder()
                    .email(req.getEmail())
                    .password(passwordEncoder.encode(req.getPassword()))
                    .role(role)
                    .status("ACTIVE")
                    .build();
            
            userRepository.save(user);
            profileId = createProfile(req, role.getRoleName(), user);
            
            log.info("User and profile created successfully for: {}", req.getEmail());
            
        } catch (BadRequestException e) {
            log.warn("Registration validation failed: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Core registration failed: {}", e.getMessage(), e);
            throw new RuntimeException("Registration failed: " + e.getMessage(), e);
        }
        
        // Send notifications and emails (non-blocking)
        try {
            String personalizedName = getPersonalizedName(req);
            
            // Send welcome notification (In-app)
            try {
                String notificationMsg = isPublic 
                    ? "Welcome! Your account as " + role.getRoleName() + " has been successfully registered."
                    : "An account has been created for you by the Administrator as a " + role.getRoleName() + ".";
                notificationService.createNotification(user.getEmail(), notificationMsg, "SUCCESS");
            } catch (Exception e) {
                log.warn("Failed to create notification, but continuing: {}", e.getMessage());
            }

            // Send welcome email (async - won't fail registration)
            if (isPublic) {
                emailService.sendWelcomeEmail(user.getEmail(), personalizedName, role.getRoleName());
            } else {
                emailService.sendAccountCreatedEmail(user.getEmail(), personalizedName, role.getRoleName(), req.getPassword());
            }
        } catch (Exception e) {
            log.warn("Notification/Email failed, but registration succeeded: {}", e.getMessage());
        }
        
        // Generate JWT token (with fallback)
        try {
            log.info("Generating JWT token for: {}", req.getEmail());
            User refreshedUser = userRepository.findByEmail(user.getEmail())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found after registration"));
            
            UserDetails userDetails = userDetailsService.loadUserByUsername(refreshedUser.getEmail());
            String token = jwtUtil.generateToken(userDetails);
            log.info("Registration completed successfully for: {}", req.getEmail());

            return new AuthResponse(token, refreshedUser.getEmail(), role.getRoleName(), profileId);
        } catch (Exception e) {
            log.error("Token generation failed, but registration was successful: {}", e.getMessage());
            // Return response without token - registration was successful
            return new AuthResponse(null, user.getEmail(), role.getRoleName(), profileId);
        }
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
                Institution inst = resolveInstitution(req);
                Student s = Student.builder()
                        .user(user)
                        .firstName(req.getFirstName())
                        .lastName(req.getLastName())
                        .institution(inst)
                        .program(req.getProgram())
                        .yearOfStudy(null) // Can be added to DTO if needed
                        .registrationNumber(req.getRegistrationNumber())
                        .phone(req.getPhone())
                        .status("ACTIVE")
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
                Institution inst = resolveInstitution(req);
                Supervisor sv = Supervisor.builder()
                        .user(user)
                        .firstName(req.getFirstName())
                        .lastName(req.getLastName())
                        .company(comp)
                        .institution(inst)
                        .phone(req.getPhone())
                        .build();
                yield supervisorRepository.save(sv).getSupervisorId();
            }
            case "INSTITUTION" -> {
                Institution inst = resolveInstitution(req);
                if (inst == null) throw new BadRequestException("Institution name or ID is required for Institution Staff");
                InstitutionStaff staff = InstitutionStaff.builder()
                        .user(user)
                        .institution(inst)
                        .firstName(req.getFirstName())
                        .lastName(req.getLastName())
                        .phone(req.getPhone())
                        .build();
                yield institutionStaffRepository.save(staff).getInstitution().getInstitutionId();
            }
            default -> null;
        };
    }

    @Transactional
    public void forgotPassword(ForgotPasswordRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + req.getEmail()));

        String token = java.util.UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setResetTokenExpiry(java.time.LocalDateTime.now().plusMinutes(30));
        userRepository.save(user);

        emailService.sendPasswordResetEmail(user.getEmail(), token);
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest req) {
        User user = userRepository.findByResetToken(req.getToken())
                .orElseThrow(() -> new BadRequestException("Invalid or expired reset token"));

        if (user.getResetTokenExpiry().isBefore(java.time.LocalDateTime.now())) {
            throw new BadRequestException("Reset token has expired");
        }

        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);
    }

    private Long resolveProfileId(User user) {
        return switch (user.getRole().getRoleName()) {
            case "STUDENT"    -> studentRepository.findByUser_UserId(user.getUserId())
                                    .map(Student::getStudentId).orElse(null);
            case "COMPANY"    -> companyRepository.findByUser_UserId(user.getUserId())
                                    .map(Company::getCompanyId).orElse(null);
            case "SUPERVISOR" -> supervisorRepository.findByUser_UserId(user.getUserId())
                                    .map(Supervisor::getSupervisorId).orElse(null);
            case "INSTITUTION"-> institutionStaffRepository.findByUser_UserId(user.getUserId())
                                    .map(staff -> staff.getInstitution().getInstitutionId()).orElse(null);
            default           -> null;
        };
    }

    private String getPersonalizedName(RegisterRequest req) {
        if (req.getFirstName() != null && !req.getFirstName().isEmpty()) {
            return req.getFirstName();
        }
        if (req.getCompanyName() != null && !req.getCompanyName().isEmpty()) {
            return req.getCompanyName();
        }
        return "User";
    }

    /**
     * Resolves an Institution from the request.
     * If newInstitutionName is provided, a new Institution is created and saved.
     * Otherwise falls back to looking up by institutionId.
     */
    private Institution resolveInstitution(RegisterRequest req) {
        if (req.getNewInstitutionName() != null && !req.getNewInstitutionName().isBlank()) {
            Institution newInst = Institution.builder()
                    .name(req.getNewInstitutionName().trim())
                    .build();
            return institutionRepository.save(newInst);
        }
        if (req.getInstitutionId() != null) {
            return institutionRepository.findById(req.getInstitutionId()).orElse(null);
        }
        return null;
    }
}
