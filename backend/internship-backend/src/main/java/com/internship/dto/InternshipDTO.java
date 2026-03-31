package com.internship.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDate;

public class InternshipDTO {

    @Data
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties(ignoreUnknown = true)
    public static class CreateRequest {
        @NotBlank private String title;
        private String description;
        private String requiredSkills;
        private String location;
        private String sector;
        private LocalDate startDate;
        private LocalDate endDate;
        private Integer slots;
    }

    @Data
    public static class Response {
        private Long internshipId;
        private Long companyId;
        private String companyName;
        private String industrySector;
        private String title;
        private String description;
        private String requiredSkills;
        private String location;
        private String sector;
        private LocalDate startDate;
        private LocalDate endDate;
        private Integer slots;
        private String status;
    }
}
