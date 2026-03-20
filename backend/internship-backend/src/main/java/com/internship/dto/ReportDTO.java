package com.internship.dto;

import lombok.Data;
import java.time.LocalDate;

public class ReportDTO {
    @Data public static class CreateRequest {
        private Long internshipId;
        private Integer weekNumber;
        private String reportContent;
    }
    @Data public static class ApprovalRequest {
        private String approvalStatus;  // APPROVED | REJECTED
        private String supervisorNotes;
    }
    @Data public static class Response {
        private Long reportId;
        private Long studentId;
        private String studentName;
        private Long internshipId;
        private String internshipTitle;
        private Integer weekNumber;
        private String reportContent;
        private LocalDate submissionDate;
        private String approvalStatus;
        private String supervisorNotes;
    }
}
