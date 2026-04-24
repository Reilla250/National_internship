package com.internship.dto.OtpDTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OtpResendRequest {
    
    @NotBlank(message = "Email is required")
    private String email;
}
