package com.internship.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

public class EvaluationDTO {
    @Data public static class CreateRequest {
        private Long studentId;
        private Long internshipId;
        private BigDecimal performanceScore;
        private BigDecimal technicalScore;
        private BigDecimal communicationScore;
        private BigDecimal teamworkScore;
        private String comments;
    }
    @Data public static class Response {
        private Long evaluationId;
        private Long studentId;
        private String studentName;
        private Long internshipId;
        private String internshipTitle;
        private BigDecimal performanceScore;
        private BigDecimal technicalScore;
        private BigDecimal communicationScore;
        private BigDecimal teamworkScore;
        private BigDecimal averageScore;
        private String comments;
        private LocalDate evaluationDate;
    }
}
