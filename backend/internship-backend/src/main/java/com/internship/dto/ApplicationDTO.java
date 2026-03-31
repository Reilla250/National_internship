package com.internship.dto;

import lombok.Data;
import java.time.LocalDate;

public class ApplicationDTO {
    @Data public static class CreateRequest {
        private Long internshipId;
        private String coverLetter;
    }
    @Data public static class StatusUpdate {
        private String status;   // ACCEPTED | REJECTED
        private String remarks;
    }
    @Data public static class Response {
        private Long applicationId;
        private Long studentId;
        private String studentName;
        private Long internshipId;
        private String internshipTitle;
        private String companyName;
        private LocalDate applicationDate;
        private String status;
        private String coverLetter;
        private String remarks;
        // Extended student info for companies
        private String studentPhone;
        private String studentProgram;
        private String studentInstitution;
        private String studentRegistrationNumber;
    }
}
