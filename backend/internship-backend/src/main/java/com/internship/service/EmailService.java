package com.internship.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;
    private final String FROM_EMAIL = "patrictuyisenge4@gmail.com";

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendWelcomeEmail(String to, String name, String role) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(FROM_EMAIL);
            message.setTo(to);
            message.setSubject("Welcome to National Internship Management System");
            message.setText("Dear " + name + ",\n\n" +
                    "Your account as a " + role + " has been successfully registered.\n" +
                    "You can now log in to the system and start exploring your dashboard.\n\n" +
                    "Best regards,\n" +
                    "Management Team");
            mailSender.send(message);
            log.info("Welcome email sent to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send welcome email to: {}. Error: {}", to, e.getMessage());
        }
    }

    @Async
    public void sendAccountCreatedEmail(String to, String name, String role, String password) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(FROM_EMAIL);
            message.setTo(to);
            message.setSubject("Account Created - National Internship Management System");
            message.setText("Dear " + name + ",\n\n" +
                    "An account has been created for you as a " + role + ".\n\n" +
                    "Your temporary login credentials are:\n" +
                    "Email: " + to + "\n" +
                    "Password: " + password + "\n\n" +
                    "Please log in and change your password as soon as possible.\n\n" +
                    "Best regards,\n" +
                    "Admin Team");
            mailSender.send(message);
            log.info("Account creation email sent to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send account creation email to: {}. Error: {}", to, e.getMessage());
        }
    }

    @Async
    public void sendPasswordResetEmail(String to, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(FROM_EMAIL);
            message.setTo(to);
            message.setSubject("Password Reset Request - National Internship Management System");
            String resetLink = "http://localhost:3000/reset-password?token=" + token;
            message.setText("Dear User,\n\n" +
                    "You requested a password reset. Please click the link below to set a new password. " +
                    "This link will expire in 30 minutes.\n\n" +
                    resetLink + "\n\n" +
                    "If you didn't request this, please ignore this email.\n\n" +
                    "Best regards,\n" +
                    "Security Team");
            mailSender.send(message);
            log.info("Password reset email sent to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send password reset email to: {}. Error: {}", to, e.getMessage());
        }
    }

    @Async
    public void sendVerificationOtpEmail(String to, String name, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(FROM_EMAIL);
            message.setTo(to);
            message.setSubject("Email Verification - National Internship Management System");
            message.setText("Dear " + name + ",\n\n" +
                    "Thank you for registering with the National Internship Management System.\n\n" +
                    "Your email verification code is: " + otp + "\n\n" +
                    "This code will expire in 10 minutes. Please enter it to verify your email address.\n\n" +
                    "If you didn't request this, please ignore this email.\n\n" +
                    "Best regards,\n" +
                    "Verification Team");
            mailSender.send(message);
            log.info("Verification OTP email sent to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send verification OTP email to: {}. Error: {}", to, e.getMessage());
        }
    }

    @Async
    public void sendVerificationSuccessEmail(String to, String name) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(FROM_EMAIL);
            message.setTo(to);
            message.setSubject("Email Verified Successfully - National Internship Management System");
            message.setText("Dear " + name + ",\n\n" +
                    "Your email has been successfully verified!\n\n" +
                    "You can now log in to your account and access all features of the system.\n\n" +
                    "Best regards,\n" +
                    "Management Team");
            mailSender.send(message);
            log.info("Verification success email sent to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send verification success email to: {}. Error: {}", to, e.getMessage());
        }
    }
}
