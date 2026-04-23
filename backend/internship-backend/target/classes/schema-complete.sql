-- National Digital Internship System - Complete FreeSQLDatabase Compatible Schema

-- Roles Table
CREATE TABLE IF NOT EXISTS roles (
    role_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default roles
INSERT IGNORE INTO roles (role_name, description) VALUES
    ('ADMIN', 'System administrator with full access'),
    ('STUDENT', 'Student seeking internships'),
    ('COMPANY', 'Company offering internships'),
    ('SUPERVISOR', 'Internship supervisor from company'),
    ('INSTITUTION', 'Educational institution staff'),
    ('GOVERNMENT', 'Government oversight staff');

-- Users Table
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- Institutions Table
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Companies Table
CREATE TABLE IF NOT EXISTS companies (
    company_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    industry VARCHAR(100),
    size VARCHAR(50),
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students Table
CREATE TABLE IF NOT EXISTS students (
    student_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    institution_id BIGINT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    registration_number VARCHAR(50),
    program VARCHAR(100),
    year_of_study INT,
    phone VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    gender VARCHAR(10),
    profile_picture VARCHAR(255),
    resume_url VARCHAR(255),
    skills TEXT,
    gpa DECIMAL(3,2),
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (institution_id) REFERENCES institutions(institution_id)
);

-- Supervisors Table
CREATE TABLE IF NOT EXISTS supervisors (
    supervisor_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    company_id BIGINT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    position VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    experience_years INT,
    specialization VARCHAR(100),
    qualification VARCHAR(255),
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (company_id) REFERENCES companies(company_id)
);

-- Internships Table
CREATE TABLE IF NOT EXISTS internships (
    internship_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    company_id BIGINT NOT NULL,
    supervisor_id BIGINT,
    type VARCHAR(50),
    duration INT,
    start_date DATE,
    end_date DATE,
    application_deadline DATE,
    location VARCHAR(255),
    remote BOOLEAN DEFAULT FALSE,
    paid BOOLEAN DEFAULT FALSE,
    stipend DECIMAL(10,2),
    requirements TEXT,
    benefits TEXT,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(company_id),
    FOREIGN KEY (supervisor_id) REFERENCES supervisors(supervisor_id)
);

-- Applications Table
CREATE TABLE IF NOT EXISTS applications (
    application_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    internship_id BIGINT NOT NULL,
    cover_letter TEXT,
    resume_url VARCHAR(255),
    status VARCHAR(20) DEFAULT 'PENDING',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (internship_id) REFERENCES internships(internship_id),
    UNIQUE (student_id, internship_id)
);

-- Reports Table
CREATE TABLE IF NOT EXISTS reports (
    report_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    supervisor_id BIGINT NOT NULL,
    internship_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    report_type VARCHAR(50),
    submission_date DATE,
    status VARCHAR(20) DEFAULT 'SUBMITTED',
    feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (supervisor_id) REFERENCES supervisors(supervisor_id),
    FOREIGN KEY (internship_id) REFERENCES internships(internship_id)
);

-- Evaluations Table
CREATE TABLE IF NOT EXISTS evaluations (
    evaluation_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    supervisor_id BIGINT NOT NULL,
    internship_id BIGINT NOT NULL,
    technical_skills DECIMAL(5,2),
    communication DECIMAL(5,2),
    teamwork DECIMAL(5,2),
    problem_solving DECIMAL(5,2),
    attendance DECIMAL(5,2),
    overall_score DECIMAL(5,2),
    comments TEXT,
    evaluation_date DATE,
    status VARCHAR(20) DEFAULT 'COMPLETED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (supervisor_id) REFERENCES supervisors(supervisor_id),
    FOREIGN KEY (internship_id) REFERENCES internships(internship_id)
);

-- Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
    certificate_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    internship_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    issue_date DATE,
    expiry_date DATE,
    certificate_url VARCHAR(255),
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (internship_id) REFERENCES internships(internship_id)
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    notification_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50),
    status VARCHAR(20) DEFAULT 'UNREAD',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Messages Table
CREATE TABLE IF NOT EXISTS messages (
    message_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_id BIGINT NOT NULL,
    receiver_id BIGINT NOT NULL,
    subject VARCHAR(255),
    content TEXT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'TEXT',
    status VARCHAR(20) DEFAULT 'SENT',
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(user_id),
    FOREIGN KEY (receiver_id) REFERENCES users(user_id)
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
    skill_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student_Skills Junction Table
CREATE TABLE IF NOT EXISTS student_skills (
    student_id BIGINT NOT NULL,
    skill_id BIGINT NOT NULL,
    proficiency_level VARCHAR(20) DEFAULT 'BEGINNER',
    acquired_date DATE,
    PRIMARY KEY (student_id, skill_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id)
);

-- Documents Table
CREATE TABLE IF NOT EXISTS documents (
    document_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    document_type VARCHAR(50),
    file_path VARCHAR(500),
    file_size BIGINT,
    mime_type VARCHAR(100),
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Audit_Log Table
CREATE TABLE IF NOT EXISTS audit_log (
    log_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id BIGINT,
    old_values TEXT,
    new_values TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
    setting_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_type VARCHAR(50) DEFAULT 'STRING',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data
INSERT IGNORE INTO institutions (name, type, address, contact_phone, contact_email) VALUES
    ('University of Rwanda', 'University', 'Kigali, Rwanda', '+250788123456', 'info@ur.ac.rw'),
    ('Kigali Institute of Technology', 'Technical Institute', 'Kigali, Rwanda', '+250787123456', 'info@kit.ac.rw'),
    ('Rwanda Polytechnic', 'Polytechnic', 'Kigali, Rwanda', '+250786123456', 'info@rp.ac.rw');

INSERT IGNORE INTO companies (name, industry, size, address, contact_phone, contact_email) VALUES
    ('RwandaTech Ltd', 'Technology', 'Medium', 'Kigali, Rwanda', '+250785123456', 'info@rwandatech.rw'),
    ('Bank of Kigali', 'Banking', 'Large', 'Kigali, Rwanda', '+250784123456', 'careers@bk.rw'),
    ('MTN Rwanda', 'Telecommunications', 'Large', 'Kigali, Rwanda', '+250783123456', 'careers@mtn.rw');

INSERT IGNORE INTO skills (name, description, category) VALUES
    ('Java Programming', 'Proficiency in Java programming language', 'Technical'),
    ('Web Development', 'HTML, CSS, JavaScript development', 'Technical'),
    ('Database Management', 'SQL and database design', 'Technical'),
    ('Communication', 'Effective verbal and written communication', 'Soft Skills'),
    ('Teamwork', 'Ability to work effectively in teams', 'Soft Skills'),
    ('Problem Solving', 'Analytical and critical thinking skills', 'Soft Skills');

INSERT IGNORE INTO settings (setting_key, setting_value, setting_type, description, is_public) VALUES
    ('system_name', 'National Digital Internship System', 'STRING', 'System name displayed in UI', true),
    ('max_file_size', '10485760', 'INTEGER', 'Maximum file upload size in bytes', false),
    ('internship_duration_min', '4', 'INTEGER', 'Minimum internship duration in weeks', true),
    ('internship_duration_max', '52', 'INTEGER', 'Maximum internship duration in weeks', true);
