package com.internship.dto;

import lombok.Data;
import java.time.LocalDate;

public class CertificateDTO {
    @Data public static class GenerateRequest {
        private Long studentId;
        private Long internshipId;
    }
    @Data public static class Response {
        private Long certificateId;
        private String studentName;
        private String internshipTitle;
        private String companyName;
        private LocalDate issueDate;
        private String certificateNumber;
        private String verificationCode;
        private String issuedBy;
    }
}
