package com.internship.dto.OtpDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class OtpResponse {
    private String message;
    private boolean success;
    private String email;
    
    public OtpResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
    }
}
