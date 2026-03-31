-- ============================================================
-- National Digital Internship & Industry Collaboration System
-- Database Schema - MySQL
-- ============================================================

CREATE DATABASE IF NOT EXISTS internship_db;
USE internship_db;

-- -------------------------
-- Roles Table
-- -------------------------
CREATE TABLE roles (
    role_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO roles (role_name) VALUES
    ('ADMIN'),
    ('STUDENT'),
    ('COMPANY'),
    ('SUPERVISOR'),
    ('INSTITUTION'),
    ('GOVERNMENT');

-- -------------------------
-- Users Table
-- -------------------------
CREATE TABLE users (
    user_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    email      VARCHAR(100) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    role_id    BIGINT NOT NULL,
    status     VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE INDEX idx_users_email ON users(email);

-- -------------------------
-- Institutions Table
-- -------------------------
CREATE TABLE institutions (
    institution_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name           VARCHAR(150) NOT NULL,
    type           VARCHAR(100),
    address        TEXT,
    contact_email  VARCHAR(100),
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------
-- Students Table
-- -------------------------
CREATE TABLE students (
    student_id      BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT NOT NULL UNIQUE,
    first_name      VARCHAR(100) NOT NULL,
    last_name       VARCHAR(100) NOT NULL,
    national_id     VARCHAR(20),
    institution_id  BIGINT,
    program         VARCHAR(100),
    graduation_year YEAR,
    phone           VARCHAR(20),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_students_user        FOREIGN KEY (user_id)        REFERENCES users(user_id),
    CONSTRAINT fk_students_institution FOREIGN KEY (institution_id) REFERENCES institutions(institution_id)
);

CREATE INDEX idx_students_user_id ON students(user_id);

-- -------------------------
-- Companies Table
-- -------------------------
CREATE TABLE companies (
    company_id     BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id        BIGINT NOT NULL UNIQUE,
    company_name   VARCHAR(150) NOT NULL,
    industry_sector VARCHAR(100),
    address        TEXT,
    contact_person VARCHAR(100),
    phone          VARCHAR(20),
    website        VARCHAR(200),
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_companies_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- -------------------------
-- Supervisors Table
-- -------------------------
CREATE TABLE supervisors (
    supervisor_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id       BIGINT NOT NULL UNIQUE,
    company_id    BIGINT,
    first_name    VARCHAR(100) NOT NULL,
    last_name     VARCHAR(100) NOT NULL,
    phone         VARCHAR(20),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_supervisors_user    FOREIGN KEY (user_id)    REFERENCES users(user_id),
    CONSTRAINT fk_supervisors_company FOREIGN KEY (company_id) REFERENCES companies(company_id)
);

-- -------------------------
-- Internships Table
-- -------------------------
CREATE TABLE internships (
    internship_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_id      BIGINT NOT NULL,
    title           VARCHAR(150) NOT NULL,
    description     TEXT,
    required_skills TEXT,
    location        VARCHAR(150),
    sector          VARCHAR(100),
    start_date      DATE,
    end_date        DATE,
    slots           INT DEFAULT 1,
    status          VARCHAR(20) NOT NULL DEFAULT 'OPEN',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_internships_company FOREIGN KEY (company_id) REFERENCES companies(company_id)
);

CREATE INDEX idx_internships_company_id  ON internships(company_id);
CREATE INDEX idx_internships_status      ON internships(status);

-- -------------------------
-- Applications Table
-- -------------------------
CREATE TABLE applications (
    application_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id       BIGINT NOT NULL,
    internship_id    BIGINT NOT NULL,
    application_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    status           VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    cover_letter     TEXT,
    remarks          TEXT,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_applications_student    FOREIGN KEY (student_id)    REFERENCES students(student_id),
    CONSTRAINT fk_applications_internship FOREIGN KEY (internship_id) REFERENCES internships(internship_id),
    CONSTRAINT uq_application UNIQUE (student_id, internship_id)
);

CREATE INDEX idx_applications_student_id    ON applications(student_id);
CREATE INDEX idx_applications_internship_id ON applications(internship_id);
CREATE INDEX idx_applications_status        ON applications(status);

-- -------------------------
-- Reports Table (Digital Logbook)
-- -------------------------
CREATE TABLE reports (
    report_id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id      BIGINT NOT NULL,
    internship_id   BIGINT NOT NULL,
    week_number     INT NOT NULL,
    report_content  TEXT NOT NULL,
    submission_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    approval_status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    supervisor_notes TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_reports_student    FOREIGN KEY (student_id)    REFERENCES students(student_id),
    CONSTRAINT fk_reports_internship FOREIGN KEY (internship_id) REFERENCES internships(internship_id)
);

CREATE INDEX idx_reports_student_id    ON reports(student_id);
CREATE INDEX idx_reports_internship_id ON reports(internship_id);

-- -------------------------
-- Evaluations Table
-- -------------------------
CREATE TABLE evaluations (
    evaluation_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id       BIGINT NOT NULL,
    supervisor_id    BIGINT NOT NULL,
    internship_id    BIGINT NOT NULL,
    performance_score DECIMAL(5,2),
    technical_score  DECIMAL(5,2),
    communication_score DECIMAL(5,2),
    teamwork_score   DECIMAL(5,2),
    comments         TEXT,
    evaluation_date  DATE NOT NULL DEFAULT (CURRENT_DATE),
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_evaluations_student    FOREIGN KEY (student_id)    REFERENCES students(student_id),
    CONSTRAINT fk_evaluations_supervisor FOREIGN KEY (supervisor_id) REFERENCES supervisors(supervisor_id),
    CONSTRAINT fk_evaluations_internship FOREIGN KEY (internship_id) REFERENCES internships(internship_id)
);

-- -------------------------
-- Certificates Table
-- -------------------------
CREATE TABLE certificates (
    certificate_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id        BIGINT NOT NULL,
    internship_id     BIGINT NOT NULL,
    issue_date        DATE NOT NULL DEFAULT (CURRENT_DATE),
    certificate_number VARCHAR(100) NOT NULL UNIQUE,
    verification_code  VARCHAR(100) NOT NULL UNIQUE,
    issued_by         VARCHAR(150),
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_certificates_student    FOREIGN KEY (student_id)    REFERENCES students(student_id),
    CONSTRAINT fk_certificates_internship FOREIGN KEY (internship_id) REFERENCES internships(internship_id)
);

CREATE INDEX idx_certificates_number ON certificates(certificate_number);

-- -------------------------
-- Collaboration Projects Table
-- -------------------------
CREATE TABLE collaboration_projects (
    project_id     BIGINT AUTO_INCREMENT PRIMARY KEY,
    title          VARCHAR(150) NOT NULL,
    description    TEXT,
    company_id     BIGINT,
    institution_id BIGINT,
    start_date     DATE,
    end_date       DATE,
    status         VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    outcomes       TEXT,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_projects_company     FOREIGN KEY (company_id)     REFERENCES companies(company_id),
    CONSTRAINT fk_projects_institution FOREIGN KEY (institution_id) REFERENCES institutions(institution_id)
);

-- -------------------------
-- Notifications Table
-- -------------------------
CREATE TABLE notifications (
    notification_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT NOT NULL,
    message         VARCHAR(255) NOT NULL,
    type            VARCHAR(50),
    is_read         BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- -------------------------
-- Institution Staff Table
-- -------------------------
CREATE TABLE institution_staff (
    staff_id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id        BIGINT NOT NULL UNIQUE,
    institution_id BIGINT NOT NULL,
    first_name     VARCHAR(100),
    last_name      VARCHAR(100),
    phone          VARCHAR(20),
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_staff_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_staff_inst FOREIGN KEY (institution_id) REFERENCES institutions(institution_id)
);

-- -------------------------
-- Seed Data
-- -------------------------
INSERT INTO institutions (name, type, address, contact_email) VALUES
    ('University of Rwanda', 'University', 'Kigali, Rwanda', 'info@ur.ac.rw'),
    ('Rwanda Polytechnic', 'Polytechnic', 'Kigali, Rwanda', 'info@rp.ac.rw'),
    ('INES-Ruhengeri', 'University', 'Ruhengeri, Rwanda', 'info@ines.ac.rw');
