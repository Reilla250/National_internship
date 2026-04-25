package com.internship.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;
    private final String FROM_EMAIL = "patrictuyisenge4@gmail.com";

    @Value("${app.frontend.url:https://national-internship-4.onrender.com}")
    private String frontendUrl;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendWelcomeEmail(String to, String name, String role) {
        try {
            String subject = "✅ Registration Successful - NDIMS";
            String html = buildRegistrationEmail(name, role, to);
            sendHtmlEmail(to, subject, html);
            log.info("Welcome email sent to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send welcome email to: {}. Error: {}", to, e.getMessage());
        }
    }

    @Async
    public void sendAccountCreatedEmail(String to, String name, String role, String password) {
        try {
            String subject = "🔑 Account Created - NDIMS";
            String html = "<!DOCTYPE html>" +
                "<html><head><meta charset=\"UTF-8\"></head><body style=\"margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#f4f7fa;\">" +
                "<div style=\"max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);\">" +
                  "<div style=\"background:linear-gradient(135deg,#2563eb,#1e40af);padding:40px 32px;text-align:center;\">" +
                    "<h1 style=\"color:#ffffff;margin:0;font-size:24px;\">🔑 Account Created</h1>" +
                    "<p style=\"color:#bfdbfe;margin:8px 0 0;font-size:14px;\">National Digital Internship Management System</p>" +
                  "</div>" +
                  "<div style=\"padding:32px;\">" +
                    "<p style=\"font-size:16px;color:#1e293b;\">Dear <strong>" + name + "</strong>,</p>" +
                    "<p style=\"font-size:14px;color:#475569;line-height:1.7;\">An admin has created an account for you as a <strong>" + role + "</strong>.</p>" +
                    "<div style=\"background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin:24px 0;\">" +
                      "<p style=\"margin:0 0 8px;font-size:13px;color:#166534;font-weight:600;\">YOUR LOGIN CREDENTIALS</p>" +
                      "<p style=\"margin:4px 0;font-size:14px;color:#1e293b;\">📧 Email: <strong>" + to + "</strong></p>" +
                      "<p style=\"margin:4px 0;font-size:14px;color:#1e293b;\">🔒 Password: <strong>" + password + "</strong></p>" +
                    "</div>" +
                    "<p style=\"font-size:13px;color:#ef4444;\">⚠️ Please change your password after your first login.</p>" +
                    "<div style=\"text-align:center;margin:28px 0;\">" +
                      "<a href=\"" + frontendUrl + "/login\" style=\"display:inline-block;background:#2563eb;color:#ffffff;padding:14px 40px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;\">Login Now</a>" +
                    "</div>" +
                  "</div>" +
                  buildFooter() +
                "</div>" +
                "</body></html>";

            sendHtmlEmail(to, subject, html);
            log.info("Account creation email sent to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send account creation email to: {}. Error: {}", to, e.getMessage());
        }
    }

    @Async
    public void sendPasswordResetEmail(String to, String token) {
        try {
            String resetLink = frontendUrl + "/reset-password?token=" + token;
            String subject = "🔐 Password Reset - NDIMS";
            String html = "<!DOCTYPE html>" +
                "<html><head><meta charset=\"UTF-8\"></head><body style=\"margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#f4f7fa;\">" +
                "<div style=\"max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);\">" +
                  "<div style=\"background:linear-gradient(135deg,#dc2626,#991b1b);padding:40px 32px;text-align:center;\">" +
                    "<h1 style=\"color:#ffffff;margin:0;font-size:24px;\">🔐 Password Reset</h1>" +
                    "<p style=\"color:#fecaca;margin:8px 0 0;font-size:14px;\">National Digital Internship Management System</p>" +
                  "</div>" +
                  "<div style=\"padding:32px;\">" +
                    "<p style=\"font-size:16px;color:#1e293b;\">Dear User,</p>" +
                    "<p style=\"font-size:14px;color:#475569;line-height:1.7;\">You requested a password reset. Click the button below to set a new password. This link will expire in <strong>30 minutes</strong>.</p>" +
                    "<div style=\"text-align:center;margin:28px 0;\">" +
                      "<a href=\"" + resetLink + "\" style=\"display:inline-block;background:#dc2626;color:#ffffff;padding:14px 40px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;\">Reset Password</a>" +
                    "</div>" +
                    "<p style=\"font-size:12px;color:#94a3b8;word-break:break-all;\">Or copy this link: " + resetLink + "</p>" +
                    "<p style=\"font-size:13px;color:#64748b;margin-top:16px;\">If you didn't request this, please ignore this email.</p>" +
                  "</div>" +
                  buildFooter() +
                "</div>" +
                "</body></html>";

            sendHtmlEmail(to, subject, html);
            log.info("Password reset email sent to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send password reset email to: {}. Error: {}", to, e.getMessage());
        }
    }

    @Async
    public void sendVerificationOtpEmail(String to, String name, String otp) {
        log.info("=== OTP FOR TESTING ===");
        log.info("Email: {}", to);
        log.info("Name: {}", name);
        log.info("OTP Code: {}", otp);
        log.info("====================");
        
        try {
            String subject = "📧 Email Verification - NDIMS";
            String html = "<!DOCTYPE html>" +
                "<html><head><meta charset=\"UTF-8\"></head><body style=\"margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#f4f7fa;\">" +
                "<div style=\"max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);\">" +
                  "<div style=\"background:linear-gradient(135deg,#2563eb,#1e40af);padding:40px 32px;text-align:center;\">" +
                    "<h1 style=\"color:#ffffff;margin:0;font-size:24px;\">📧 Email Verification</h1>" +
                  "</div>" +
                  "<div style=\"padding:32px;text-align:center;\">" +
                    "<p style=\"font-size:16px;color:#1e293b;\">Dear <strong>" + name + "</strong>,</p>" +
                    "<p style=\"font-size:14px;color:#475569;\">Your verification code is:</p>" +
                    "<div style=\"background:#f0f9ff;border:2px dashed #3b82f6;border-radius:12px;padding:20px;margin:20px 0;\">" +
                      "<p style=\"font-size:36px;font-weight:800;color:#1e40af;letter-spacing:8px;margin:0;\">" + otp + "</p>" +
                    "</div>" +
                    "<p style=\"font-size:13px;color:#94a3b8;\">This code expires in 10 minutes.</p>" +
                  "</div>" +
                  buildFooter() +
                "</div>" +
                "</body></html>";

            sendHtmlEmail(to, subject, html);
            log.info("Verification OTP email sent to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send verification OTP email to: {}. Error: {}", to, e.getMessage());
            log.info("OTP was logged to console for manual verification");
        }
    }

    @Async
    public void sendVerificationSuccessEmail(String to, String name) {
        try {
            String subject = "✅ Email Verified - NDIMS";
            String html = "<!DOCTYPE html>" +
                "<html><head><meta charset=\"UTF-8\"></head><body style=\"margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#f4f7fa;\">" +
                "<div style=\"max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);\">" +
                  "<div style=\"background:linear-gradient(135deg,#16a34a,#15803d);padding:40px 32px;text-align:center;\">" +
                    "<h1 style=\"color:#ffffff;margin:0;font-size:24px;\">✅ Email Verified!</h1>" +
                  "</div>" +
                  "<div style=\"padding:32px;\">" +
                    "<p style=\"font-size:16px;color:#1e293b;\">Dear <strong>" + name + "</strong>,</p>" +
                    "<p style=\"font-size:14px;color:#475569;line-height:1.7;\">Your email has been successfully verified! You can now log in and access all features.</p>" +
                    "<div style=\"text-align:center;margin:28px 0;\">" +
                      "<a href=\"" + frontendUrl + "/login\" style=\"display:inline-block;background:#16a34a;color:#ffffff;padding:14px 40px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;\">Go to Login</a>" +
                    "</div>" +
                  "</div>" +
                  buildFooter() +
                "</div>" +
                "</body></html>";

            sendHtmlEmail(to, subject, html);
            log.info("Verification success email sent to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send verification success email to: {}. Error: {}", to, e.getMessage());
        }
    }

    // ── Registration Confirmation Email ─────────────────
    private String buildRegistrationEmail(String name, String role, String email) {
        String roleEmoji = switch (role) {
            case "STUDENT"     -> "🎓";
            case "COMPANY"     -> "🏢";
            case "SUPERVISOR"  -> "👨‍🏫";
            case "INSTITUTION" -> "🏫";
            case "GOVERNMENT"  -> "🏛️";
            case "ADMIN"       -> "⚙️";
            default            -> "👤";
        };

        String roleColor = switch (role) {
            case "STUDENT"     -> "#2563eb";
            case "COMPANY"     -> "#059669";
            case "SUPERVISOR"  -> "#7c3aed";
            case "INSTITUTION" -> "#ea580c";
            case "GOVERNMENT"  -> "#475569";
            case "ADMIN"       -> "#dc2626";
            default            -> "#2563eb";
        };

        return "<!DOCTYPE html>" +
            "<html><head><meta charset=\"UTF-8\"></head>" +
            "<body style=\"margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#f4f7fa;\">" +
            "<div style=\"max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);\">" +

              // Header with gradient
              "<div style=\"background:linear-gradient(135deg," + roleColor + "," + roleColor + "dd);padding:40px 32px;text-align:center;\">" +
                "<div style=\"font-size:48px;margin-bottom:12px;\">" + roleEmoji + "</div>" +
                "<h1 style=\"color:#ffffff;margin:0;font-size:24px;\">Registration Successful!</h1>" +
                "<p style=\"color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;\">National Digital Internship Management System</p>" +
              "</div>" +

              // Body
              "<div style=\"padding:32px;\">" +
                "<p style=\"font-size:16px;color:#1e293b;margin-bottom:4px;\">Dear <strong>" + name + "</strong>,</p>" +
                "<p style=\"font-size:14px;color:#475569;line-height:1.7;\">Welcome to <strong>NDIMS</strong>! Your account has been successfully created and is ready to use.</p>" +

                // Account details card
                "<div style=\"background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin:24px 0;\">" +
                  "<p style=\"margin:0 0 12px;font-size:13px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:1px;\">ACCOUNT DETAILS</p>" +
                  "<table style=\"width:100%;border-collapse:collapse;\">" +
                    "<tr><td style=\"padding:6px 0;font-size:14px;color:#94a3b8;width:100px;\">Email</td><td style=\"padding:6px 0;font-size:14px;color:#1e293b;font-weight:600;\">" + email + "</td></tr>" +
                    "<tr><td style=\"padding:6px 0;font-size:14px;color:#94a3b8;\">Role</td><td style=\"padding:6px 0;font-size:14px;color:#1e293b;font-weight:600;\">" + roleEmoji + " " + role + "</td></tr>" +
                    "<tr><td style=\"padding:6px 0;font-size:14px;color:#94a3b8;\">Status</td><td style=\"padding:6px 0;\"><span style=\"background:#dcfce7;color:#166534;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;\">✅ Active</span></td></tr>" +
                  "</table>" +
                "</div>" +

                // What's next
                "<p style=\"font-size:14px;color:#475569;line-height:1.7;\">You can now log in using your email and password to access your personalized dashboard.</p>" +

                // CTA Button
                "<div style=\"text-align:center;margin:28px 0;\">" +
                  "<a href=\"" + frontendUrl + "/login\" style=\"display:inline-block;background:" + roleColor + ";color:#ffffff;padding:14px 40px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;\">Login to Your Dashboard</a>" +
                "</div>" +

                "<p style=\"font-size:13px;color:#94a3b8;text-align:center;\">If you did not create this account, please ignore this email.</p>" +
              "</div>" +

              // Footer
              buildFooter() +
            "</div>" +
            "</body></html>";
    }

    // ── Email Footer ────────────────────────────────────
    private String buildFooter() {
        return "<div style=\"background:#f8fafc;padding:20px 32px;text-align:center;border-top:1px solid #e2e8f0;\">" +
                 "<p style=\"margin:0;font-size:12px;color:#94a3b8;\">© 2026 National Digital Internship Management System</p>" +
                 "<p style=\"margin:4px 0 0;font-size:11px;color:#cbd5e1;\">This is an automated message. Please do not reply.</p>" +
               "</div>";
    }

    // ── Send HTML Email Helper ──────────────────────────
    private void sendHtmlEmail(String to, String subject, String htmlBody) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom(FROM_EMAIL);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlBody, true);
        mailSender.send(message);
    }
}
