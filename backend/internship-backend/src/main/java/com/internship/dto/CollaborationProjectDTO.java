package com.internship.dto;

import lombok.Data;
import java.time.LocalDate;

public class CollaborationProjectDTO {
    @Data public static class CreateRequest {
        private String title;
        private String description;
        private Long companyId;
        private Long institutionId;
        private LocalDate startDate;
        private LocalDate endDate;
    }
    @Data public static class Response {
        private Long projectId;
        private String title;
        private String description;
        private String companyName;
        private String institutionName;
        private LocalDate startDate;
        private LocalDate endDate;
        private String status;
        private String outcomes;
    }
}
