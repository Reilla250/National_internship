package com.internship.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

// ── Auth ──────────────────────────────────────────────────────────
public class AuthDTO {

    @Data
    public static class RegisterRequest {
        @NotBlank @Email
        private String email;
        @NotBlank @Size(min = 6)
        private String password;
        @NotBlank
        private String roleName;   // STUDENT | COMPANY | SUPERVISOR | INSTITUTION | GOVERNMENT
        // profile fields
        private String firstName;
        private String lastName;
        private String companyName;
        private Long institutionId;
        private String program;
        private Long companyId;
    }

    @Data
    public static class LoginRequest {
        @NotBlank @Email
        private String email;
        @NotBlank
        private String password;
    }

    @Data
    public static class AuthResponse {
        private String token;
        private String email;
        private String role;
        private Long profileId;

        public AuthResponse(String token, String email, String role, Long profileId) {
            this.token = token;
            this.email = email;
            this.role = role;
            this.profileId = profileId;
        }
    }
}
