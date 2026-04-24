-- ============================================================
-- National Digital Internship & Industry Collaboration System
-- Cloud Database Schema - MySQL (For FreeSQLDatabase)
-- ============================================================
-- Note: This schema assumes database 'sql7824124' already exists
-- USE sql7824124;

-- -------------------------
-- Roles Table
-- -------------------------
CREATE TABLE IF NOT EXISTS roles (
    role_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- Insert default roles if they don't exist
INSERT IGNORE INTO roles (role_name) VALUES
    ('ADMIN'),
    ('STUDENT'),
    ('COMPANY'),
    ('SUPERVISOR'),
    ('INSTITUTION'),
    ('GOVERNMENT');

-- -------------------------
-- Users Table
-- -------------------------
CREATE TABLE IF NOT EXISTS users (
    user_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    email      VARCHAR(100) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    role_id    BIGINT NOT NULL,
    status     VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- -------------------------
-- Institutions Table
-- -------------------------
CREATE TABLE IF NOT EXISTS institutions (
    institution_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name           VARCHAR(200) NOT NULL,
    type           VARCHAR(50) NOT NULL,
    address        TEXT,
    phone          VARCHAR(20),
    email          VARCHAR(100),
    website        VARCHAR(255),
    description    TEXT,
    status         VARCHAR(20) DEFAULT 'ACTIVE',
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -------------------------
-- Companies Table
-- -------------------------
CREATE TABLE IF NOT EXISTS companies (
    company_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(200) NOT NULL,
    industry      VARCHAR(100),
    size          VARCHAR(50),
    address       TEXT,
    phone         VARCHAR(20),
    email         VARCHAR(100),
    website       VARCHAR(255),
    description   TEXT,
    status        VARCHAR(20) DEFAULT 'ACTIVE',
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -------------------------
-- Students Table
-- -------------------------
CREATE TABLE IF NOT EXISTS students (
    student_id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id            BIGINT NOT NULL UNIQUE,
    institution_id     BIGINT,
    first_name         VARCHAR(100) NOT NULL,
    last_name          VARCHAR(100) NOT NULL,
    registration_number VARCHAR(50),
    program            VARCHAR(100),
    year_of_study      INT,
    phone              VARCHAR(20),
    address            TEXT,
    date_of_birth      DATE,
    gender             VARCHAR(10),
    profile_picture    VARCHAR(255),
    resume_url         VARCHAR(255),
    skills             TEXT,
    gpa                DECIMAL(3,2),
    status             VARCHAR(20) DEFAULT 'ACTIVE',
    created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_students_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_students_institution FOREIGN KEY (institution_id) REFERENCES institutions(institution_id)
);

-- -------------------------
-- Supervisors Table
-- -------------------------
CREATE TABLE IF NOT EXISTS supervisors (
    supervisor_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT NOT NULL UNIQUE,
    company_id      BIGINT,
    first_name      VARCHAR(100) NOT NULL,
    last_name       VARCHAR(100) NOT NULL,
    department      VARCHAR(100),
    position        VARCHAR(100),
    phone           VARCHAR(20),
    email           VARCHAR(100),
    experience_years INT,
    specialization  VARCHAR(100),
    qualification   VARCHAR(255),
    status          VARCHAR(20) DEFAULT 'ACTIVE',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_supervisors_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_supervisors_company FOREIGN KEY (company_id) REFERENCES companies(company_id)
);

-- -------------------------
-- Internships Table
-- -------------------------
CREATE TABLE IF NOT EXISTS internships (
    internship_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    title           VARCHAR(200) NOT NULL,
    description     TEXT NOT NULL,
    company_id      BIGINT NOT NULL,
    supervisor_id   BIGINT,
    type            VARCHAR(50),
    duration        INT,
    start_date      DATE,
    end_date        DATE,
    application_deadline DATE,
    location        VARCHAR(255),
    remote          BOOLEAN DEFAULT FALSE,
    paid            BOOLEAN DEFAULT FALSE,
    stipend         DECIMAL(10,2),
    requirements    TEXT,
    benefits        TEXT,
    status          VARCHAR(20) DEFAULT 'ACTIVE',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_internships_company FOREIGN KEY (company_id) REFERENCES companies(company_id),
    CONSTRAINT fk_internships_supervisor FOREIGN KEY (supervisor_id) REFERENCES supervisors(supervisor_id)
);

-- -------------------------
-- Applications Table
-- -------------------------
CREATE TABLE IF NOT EXISTS applications (
    application_id  BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id      BIGINT NOT NULL,
    internship_id   BIGINT NOT NULL,
    cover_letter    TEXT,
    resume_url      VARCHAR(255),
    status          VARCHAR(20) DEFAULT 'PENDING',
    applied_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_applications_student FOREIGN KEY (student_id) REFERENCES students(student_id),
    CONSTRAINT fk_applications_internship FOREIGN KEY (internship_id) REFERENCES internships(internship_id),
    CONSTRAINT uc_student_internship UNIQUE (student_id, internship_id)
);

-- -------------------------
-- Reports Table
-- -------------------------
CREATE TABLE IF NOT EXISTS reports (
    report_id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id      BIGINT NOT NULL,
    supervisor_id   BIGINT NOT NULL,
    internship_id   BIGINT NOT NULL,
    title           VARCHAR(200) NOT NULL,
    content         TEXT NOT NULL,
    report_type     VARCHAR(50),
    submission_date DATE,
    status          VARCHAR(20) DEFAULT 'SUBMITTED',
    feedback        TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_reports_student FOREIGN KEY (student_id) REFERENCES students(student_id),
    CONSTRAINT fk_reports_supervisor FOREIGN KEY (supervisor_id) REFERENCES supervisors(supervisor_id),
    CONSTRAINT fk_reports_internship FOREIGN KEY (internship_id) REFERENCES internships(internship_id)
);

-- -------------------------
-- Evaluations Table
-- -------------------------
CREATE TABLE IF NOT EXISTS evaluations (
    evaluation_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id      BIGINT NOT NULL,
    supervisor_id   BIGINT NOT NULL,
    internship_id   BIGINT NOT NULL,
    technical_skills DECIMAL(5,2),
    communication   DECIMAL(5,2),
    teamwork        DECIMAL(5,2),
    problem_solving DECIMAL(5,2),
    attendance      DECIMAL(5,2),
    overall_score   DECIMAL(5,2),
    comments        TEXT,
    evaluation_date DATE,
    status          VARCHAR(20) DEFAULT 'COMPLETED',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_evaluations_student FOREIGN KEY (student_id) REFERENCES students(student_id),
    CONSTRAINT fk_evaluations_supervisor FOREIGN KEY (supervisor_id) REFERENCES supervisors(supervisor_id),
    CONSTRAINT fk_evaluations_internship FOREIGN KEY (internship_id) REFERENCES internships(internship_id)
);

-- -------------------------
-- Certificates Table
-- -------------------------
CREATE TABLE IF NOT EXISTS certificates (
    certificate_id  BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id      BIGINT NOT NULL,
    internship_id   BIGINT NOT NULL,
    title           VARCHAR(200) NOT NULL,
    description     TEXT,
    issue_date      DATE,
    expiry_date     DATE,
    certificate_url VARCHAR(255),
    status          VARCHAR(20) DEFAULT 'ACTIVE',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_certificates_student FOREIGN KEY (student_id) REFERENCES students(student_id),
    CONSTRAINT fk_certificates_internship FOREIGN KEY (internship_id) REFERENCES internships(internship_id)
);

-- -------------------------
-- Notifications Table
-- -------------------------
CREATE TABLE IF NOT EXISTS notifications (
    notification_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT NOT NULL,
    title           VARCHAR(200) NOT NULL,
    message         TEXT NOT NULL,
    type            VARCHAR(50),
    status          VARCHAR(20) DEFAULT 'UNREAD',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- -------------------------
-- Sample Data Insertion
-- -------------------------
-- Insert sample institutions
INSERT IGNORE INTO institutions (name, type, address, phone, email) VALUES
    ('University of Rwanda', 'University', 'Kigali, Rwanda', '+250788123456', 'info@ur.ac.rw'),
    ('Kigali Institute of Technology', 'Technical Institute', 'Kigali, Rwanda', '+250787123456', 'info@kit.ac.rw'),
    ('Rwanda Polytechnic', 'Polytechnic', 'Kigali, Rwanda', '+250786123456', 'info@rp.ac.rw');

-- Insert sample companies
INSERT IGNORE INTO companies (name, industry, size, address, phone, email) VALUES
    ('RwandaTech Ltd', 'Technology', 'Medium', 'Kigali, Rwanda', '+250785123456', 'info@rwandatech.rw'),
    ('Bank of Kigali', 'Banking', 'Large', 'Kigali, Rwanda', '+250784123456', 'careers@bk.rw'),
    ('MTN Rwanda', 'Telecommunications', 'Large', 'Kigali, Rwanda', '+250783123456', 'careers@mtn.rw');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_students_user_id ON students(user_id);
CREATE INDEX IF NOT EXISTS idx_supervisors_user_id ON supervisors(user_id);
CREATE INDEX IF NOT EXISTS idx_internships_company_id ON internships(company_id);
CREATE INDEX IF NOT EXISTS idx_applications_student_id ON applications(student_id);
CREATE INDEX IF NOT EXISTS idx_applications_internship_id ON applications(internship_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
