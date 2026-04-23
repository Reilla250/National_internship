-- ============================================================
-- National Digital Internship & Industry Collaboration System
-- Database Schema - FreeSQLDatabase Compatible
-- ============================================================

-- Note: Database sql7824124 is already created by FreeSQLDatabase

-- -------------------------
-- Roles Table (Core system roles)
-- -------------------------
CREATE TABLE IF NOT EXISTS roles (
    role_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT IGNORE INTO roles (role_name, description) VALUES
    ('ADMIN', 'System administrator with full access'),
    ('STUDENT', 'Student seeking internships'),
    ('COMPANY', 'Company offering internships'),
    ('SUPERVISOR', 'Internship supervisor from company'),
    ('INSTITUTION', 'Educational institution staff'),
    ('GOVERNMENT', 'Government oversight staff');

-- -------------------------
-- Users Table (Enhanced with security features)
-- -------------------------
CREATE TABLE IF NOT EXISTS users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP NULL,
    failed_login_attempts INT DEFAULT 0,
    account_locked BOOLEAN DEFAULT FALSE,
    locked_until TIMESTAMP NULL,
    reset_token VARCHAR(255),
    reset_token_expiry TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_role ON users(role_id);
CREATE INDEX idx_users_reset_token ON users(reset_token);

-- -------------------------
-- Institutions Table (Enhanced)
-- -------------------------
CREATE TABLE IF NOT EXISTS institutions (
    institution_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    type VARCHAR(50) NOT NULL,
    registration_number VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Rwanda',
    contact_email VARCHAR(100),
    contact_phone VARCHAR(20),
    website VARCHAR(200),
    is_verified BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_institutions_type ON institutions(type);
CREATE INDEX idx_institutions_status ON institutions(status);

-- -------------------------
-- Students Table (Enhanced with more fields)
-- -------------------------
CREATE TABLE students (
    student_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    national_id VARCHAR(20) UNIQUE,
    passport_number VARCHAR(20),
    date_of_birth DATE,
    gender ENUM('MALE', 'FEMALE', 'OTHER'),
    institution_id BIGINT,
    student_id_number VARCHAR(50) UNIQUE,
    program VARCHAR(100),
    department VARCHAR(100),
    study_level ENUM('BACHELOR', 'MASTER', 'PHD', 'DIPLOMA', 'CERTIFICATE'),
    graduation_year YEAR,
    current_gpa DECIMAL(3,2),
    phone VARCHAR(20),
    address TEXT,
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    cv_url VARCHAR(500),
    profile_picture_url VARCHAR(500),
    is_verified BOOLEAN DEFAULT FALSE,
    status ENUM('ACTIVE', 'GRADUATED', 'SUSPENDED', 'WITHDRAWN') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_students_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_students_institution FOREIGN KEY (institution_id) REFERENCES institutions(institution_id) ON DELETE SET NULL,
    CONSTRAINT chk_gpa CHECK (current_gpa BETWEEN 0.00 AND 4.00),
    CONSTRAINT chk_graduation_year CHECK (graduation_year >= 2000 AND graduation_year <= 2030)
);

CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_institution_id ON students(institution_id);
CREATE INDEX idx_students_status ON students(status);
CREATE INDEX idx_students_program ON students(program);

-- -------------------------
-- Companies Table (Enhanced)
-- -------------------------
CREATE TABLE companies (
    company_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    company_name VARCHAR(150) NOT NULL,
    industry_sector ENUM('TECHNOLOGY', 'FINANCE', 'HEALTHCARE', 'EDUCATION', 'MANUFACTURING', 'GOVERNMENT', 'NGO', 'OTHER') NOT NULL,
    registration_number VARCHAR(50) UNIQUE,
    tax_identification_number VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Rwanda',
    contact_person VARCHAR(100),
    contact_person_title VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    website VARCHAR(200),
    company_size ENUM('SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE'),
    founded_year YEAR,
    description TEXT,
    logo_url VARCHAR(500),
    is_verified BOOLEAN DEFAULT FALSE,
    status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_companies_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT chk_founded_year CHECK (founded_year >= 1900 AND founded_year <= 2024)
);

CREATE INDEX idx_companies_user_id ON companies(user_id);
CREATE INDEX idx_companies_sector ON companies(industry_sector);
CREATE INDEX idx_companies_status ON companies(status);
CREATE INDEX idx_companies_verified ON companies(is_verified);

-- -------------------------
-- Supervisors Table (Enhanced)
-- -------------------------
CREATE TABLE supervisors (
    supervisor_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    company_id BIGINT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    employee_id VARCHAR(50),
    job_title VARCHAR(100),
    department VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    years_of_experience INT,
    qualifications TEXT,
    specialization VARCHAR(200),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_supervisors_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_supervisors_company FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE SET NULL,
    CONSTRAINT chk_experience CHECK (years_of_experience >= 0)
);

CREATE INDEX idx_supervisors_user_id ON supervisors(user_id);
CREATE INDEX idx_supervisors_company_id ON supervisors(company_id);
CREATE INDEX idx_supervisors_active ON supervisors(is_active);

-- -------------------------
-- Institution Staff Table
-- -------------------------
CREATE TABLE institution_staff (
    staff_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    institution_id BIGINT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    employee_id VARCHAR(50),
    job_title VARCHAR(100),
    department VARCHAR(100),
    phone VARCHAR(20),
    office_location VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_staff_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_staff_institution FOREIGN KEY (institution_id) REFERENCES institutions(institution_id) ON DELETE CASCADE
);

CREATE INDEX idx_staff_user_id ON institution_staff(user_id);
CREATE INDEX idx_staff_institution_id ON institution_staff(institution_id);

-- -------------------------
-- Internships Table (Enhanced)
-- -------------------------
CREATE TABLE internships (
    internship_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_id BIGINT NOT NULL,
    supervisor_id BIGINT,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    required_skills TEXT,
    responsibilities TEXT,
    benefits TEXT,
    location VARCHAR(150),
    work_type ENUM('ONSITE', 'REMOTE', 'HYBRID') DEFAULT 'ONSITE',
    sector VARCHAR(100),
    duration_weeks INT,
    start_date DATE,
    end_date DATE,
    application_deadline DATE,
    slots INT DEFAULT 1,
    status ENUM('DRAFT', 'OPEN', 'CLOSED', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'DRAFT',
    is_paid BOOLEAN DEFAULT FALSE,
    stipend_amount DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'RWF',
    requirements TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_internships_company FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE,
    CONSTRAINT fk_internships_supervisor FOREIGN KEY (supervisor_id) REFERENCES supervisors(supervisor_id) ON DELETE SET NULL,
    CONSTRAINT chk_dates CHECK (end_date > start_date),
    CONSTRAINT chk_deadline CHECK (application_deadline <= start_date),
    CONSTRAINT chk_slots CHECK (slots > 0),
    CONSTRAINT chk_duration CHECK (duration_weeks > 0)
);

CREATE INDEX idx_internships_company_id ON internships(company_id);
CREATE INDEX idx_internships_supervisor_id ON internships(supervisor_id);
CREATE INDEX idx_internships_status ON internships(status);
CREATE INDEX idx_internships_work_type ON internships(work_type);
CREATE INDEX idx_internships_deadline ON internships(application_deadline);

-- -------------------------
-- Applications Table (Enhanced)
-- -------------------------
CREATE TABLE applications (
    application_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    internship_id BIGINT NOT NULL,
    application_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    status ENUM('PENDING', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED', 'WITHDRAWN') NOT NULL DEFAULT 'PENDING',
    cover_letter TEXT,
    resume_url VARCHAR(500),
    portfolio_url VARCHAR(500),
    additional_documents TEXT,
    remarks TEXT,
    reviewed_by BIGINT,
    reviewed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_applications_student FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    CONSTRAINT fk_applications_internship FOREIGN KEY (internship_id) REFERENCES internships(internship_id) ON DELETE CASCADE,
    CONSTRAINT fk_applications_reviewer FOREIGN KEY (reviewed_by) REFERENCES users(user_id) ON DELETE SET NULL,
    CONSTRAINT uq_application UNIQUE (student_id, internship_id)
);

CREATE INDEX idx_applications_student_id ON applications(student_id);
CREATE INDEX idx_applications_internship_id ON applications(internship_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_date ON applications(application_date);

-- -------------------------
-- Reports Table (Digital Logbook - Enhanced)
-- -------------------------
CREATE TABLE reports (
    report_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    internship_id BIGINT NOT NULL,
    week_number INT NOT NULL,
    report_content TEXT NOT NULL,
    activities_performed TEXT,
    skills_learned TEXT,
    challenges TEXT,
    achievements TEXT,
    next_week_plan TEXT,
    submission_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    approval_status ENUM('PENDING', 'APPROVED', 'REJECTED', 'RESUBMIT') NOT NULL DEFAULT 'PENDING',
    supervisor_notes TEXT,
    supervisor_id BIGINT,
    reviewed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_reports_student FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    CONSTRAINT fk_reports_internship FOREIGN KEY (internship_id) REFERENCES internships(internship_id) ON DELETE CASCADE,
    CONSTRAINT fk_reports_supervisor FOREIGN KEY (supervisor_id) REFERENCES supervisors(supervisor_id) ON DELETE SET NULL,
    CONSTRAINT uq_student_internship_week UNIQUE (student_id, internship_id, week_number),
    CONSTRAINT chk_week_number CHECK (week_number > 0)
);

CREATE INDEX idx_reports_student_id ON reports(student_id);
CREATE INDEX idx_reports_internship_id ON reports(internship_id);
CREATE INDEX idx_reports_supervisor_id ON reports(supervisor_id);
CREATE INDEX idx_reports_status ON reports(approval_status);
CREATE INDEX idx_reports_submission_date ON reports(submission_date);

-- -------------------------
-- Evaluations Table (Enhanced)
-- -------------------------
CREATE TABLE evaluations (
    evaluation_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    supervisor_id BIGINT NOT NULL,
    internship_id BIGINT NOT NULL,
    evaluation_type ENUM('MIDTERM', 'FINAL', 'WEEKLY') NOT NULL DEFAULT 'WEEKLY',
    week_number INT,
    performance_score DECIMAL(5,2),
    technical_score DECIMAL(5,2),
    communication_score DECIMAL(5,2),
    teamwork_score DECIMAL(5,2),
    punctuality_score DECIMAL(5,2),
    problem_solving_score DECIMAL(5,2),
    overall_score DECIMAL(5,2),
    strengths TEXT,
    areas_for_improvement TEXT,
    comments TEXT,
    recommendations TEXT,
    evaluation_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_evaluations_student FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    CONSTRAINT fk_evaluations_supervisor FOREIGN KEY (supervisor_id) REFERENCES supervisors(supervisor_id) ON DELETE CASCADE,
    CONSTRAINT fk_evaluations_internship FOREIGN KEY (internship_id) REFERENCES internships(internship_id) ON DELETE CASCADE,
    CONSTRAINT chk_score_range CHECK (performance_score BETWEEN 0 AND 100 AND technical_score BETWEEN 0 AND 100 AND communication_score BETWEEN 0 AND 100 AND teamwork_score BETWEEN 0 AND 100 AND punctuality_score BETWEEN 0 AND 100 AND problem_solving_score BETWEEN 0 AND 100 AND overall_score BETWEEN 0 AND 100)
);

CREATE INDEX idx_evaluations_student_id ON evaluations(student_id);
CREATE INDEX idx_evaluations_supervisor_id ON evaluations(supervisor_id);
CREATE INDEX idx_evaluations_internship_id ON evaluations(internship_id);
CREATE INDEX idx_evaluations_type ON evaluations(evaluation_type);

-- -------------------------
-- Certificates Table (Enhanced)
-- -------------------------
CREATE TABLE certificates (
    certificate_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    internship_id BIGINT NOT NULL,
    issue_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    certificate_number VARCHAR(100) NOT NULL UNIQUE,
    verification_code VARCHAR(100) NOT NULL UNIQUE,
    issued_by VARCHAR(150),
    certificate_type ENUM('COMPLETION', 'EXCELLENCE', 'PARTICIPATION') DEFAULT 'COMPLETION',
    performance_grade VARCHAR(5),
    skills_acquired TEXT,
    duration_weeks INT,
    certificate_url VARCHAR(500),
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_certificates_student FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    CONSTRAINT fk_certificates_internship FOREIGN KEY (internship_id) REFERENCES internships(internship_id) ON DELETE CASCADE
);

CREATE INDEX idx_certificates_number ON certificates(certificate_number);
CREATE INDEX idx_certificates_verification_code ON certificates(verification_code);
CREATE INDEX idx_certificates_student_id ON certificates(student_id);

-- -------------------------
-- Collaboration Projects Table (Enhanced)
-- -------------------------
CREATE TABLE collaboration_projects (
    project_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    objectives TEXT,
    expected_outcomes TEXT,
    company_id BIGINT,
    institution_id BIGINT,
    supervisor_id BIGINT,
    start_date DATE,
    end_date DATE,
    status ENUM('PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PLANNING',
    budget DECIMAL(12,2),
    funding_source VARCHAR(100),
    project_type ENUM('RESEARCH', 'DEVELOPMENT', 'TRAINING', 'CONSULTING', 'OTHER') DEFAULT 'DEVELOPMENT',
    outcomes TEXT,
    lessons_learned TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_projects_company FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE SET NULL,
    CONSTRAINT fk_projects_institution FOREIGN KEY (institution_id) REFERENCES institutions(institution_id) ON DELETE SET NULL,
    CONSTRAINT fk_projects_supervisor FOREIGN KEY (supervisor_id) REFERENCES supervisors(supervisor_id) ON DELETE SET NULL,
    CONSTRAINT chk_project_dates CHECK (end_date > start_date OR end_date IS NULL)
);

CREATE INDEX idx_projects_company_id ON collaboration_projects(company_id);
CREATE INDEX idx_projects_institution_id ON collaboration_projects(institution_id);
CREATE INDEX idx_projects_status ON collaboration_projects(status);

-- -------------------------
-- Notifications Table (Enhanced)
-- -------------------------
CREATE TABLE notifications (
    notification_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('APPLICATION', 'EVALUATION', 'REPORT', 'SYSTEM', 'ANNOUNCEMENT', 'REMINDER') NOT NULL DEFAULT 'SYSTEM',
    priority ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') DEFAULT 'MEDIUM',
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    action_url VARCHAR(500),
    action_required BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT chk_notification_expiry CHECK (expires_at IS NULL OR expires_at > created_at)
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_priority ON notifications(priority);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- -------------------------
-- Audit Log Table (For tracking changes)
-- -------------------------
CREATE TABLE audit_logs (
    log_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id BIGINT,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE INDEX idx_audit_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_table ON audit_logs(table_name);
CREATE INDEX idx_audit_created_at ON audit_logs(created_at);

-- -------------------------
-- System Settings Table
-- -------------------------
CREATE TABLE system_settings (
    setting_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_settings_key ON system_settings(setting_key);

-- -------------------------
-- Seed Data (Enhanced)
-- -------------------------
INSERT INTO institutions (name, type, registration_number, address, city, contact_email, contact_phone, website) VALUES
    ('University of Rwanda', 'UNIVERSITY', 'UR-001', 'Kigali, Rwanda', 'Kigali', 'info@ur.ac.rw', '+250788123456', 'www.ur.ac.rw'),
    ('Rwanda Polytechnic', 'POLYTECHNIC', 'RP-002', 'Kigali, Rwanda', 'Kigali', 'info@rp.ac.rw', '+250788123457', 'www.rp.ac.rw'),
    ('INES-Ruhengeri', 'UNIVERSITY', 'INES-003', 'Ruhengeri, Rwanda', 'Ruhengeri', 'info@ines.ac.rw', '+250788123458', 'www.ines.ac.rw'),
    ('Kigali Institute of Science and Technology', 'POLYTECHNIC', 'KIST-004', 'Kigali, Rwanda', 'Kigali', 'info@kist.ac.rw', '+250788123459', 'www.kist.ac.rw');

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, description, is_public) VALUES
    ('system_name', 'National Internship Management System', 'System name displayed in UI', true),
    ('max_applications_per_student', '10', 'Maximum number of applications a student can submit', false),
    ('default_internship_duration_weeks', '12', 'Default duration for internships in weeks', false),
    ('enable_email_notifications', 'true', 'Enable email notifications system-wide', false),
    ('maintenance_mode', 'false', 'Put system in maintenance mode', false);

-- Create views for common queries
CREATE VIEW active_internships AS
SELECT i.*, c.company_name, u.email as company_email
FROM internships i
JOIN companies c ON i.company_id = c.company_id
JOIN users u ON c.user_id = u.user_id
WHERE i.status = 'OPEN' AND i.application_deadline >= CURDATE();

CREATE VIEW student_applications AS
SELECT a.*, s.first_name, s.last_name, i.title as internship_title, c.company_name
FROM applications a
JOIN students s ON a.student_id = s.student_id
JOIN internships i ON a.internship_id = i.internship_id
JOIN companies c ON i.company_id = c.company_id;
