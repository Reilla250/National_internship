-- Fix database schema for student registration
-- This script handles existing tables and ensures proper structure

-- Drop existing problematic tables if they exist
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS supervisors;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS institutions;
DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS internships;
DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS evaluations;
DROP TABLE IF EXISTS certificates;
DROP TABLE IF EXISTS notifications;

-- Recreate institutions table
CREATE TABLE institutions (
    institution_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    type VARCHAR(50) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    website VARCHAR(255),
    description TEXT,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Recreate companies table
CREATE TABLE companies (
    company_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    industry VARCHAR(100),
    size VARCHAR(50),
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    website VARCHAR(255),
    description TEXT,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Recreate students table with proper structure
CREATE TABLE students (
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_students_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_students_institution FOREIGN KEY (institution_id) REFERENCES institutions(institution_id)
);

-- Recreate supervisors table
CREATE TABLE supervisors (
    supervisor_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    company_id BIGINT,
    institution_id BIGINT,
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_supervisors_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_supervisors_company FOREIGN KEY (company_id) REFERENCES companies(company_id),
    CONSTRAINT fk_supervisors_institution FOREIGN KEY (institution_id) REFERENCES institutions(institution_id)
);

-- Insert sample institutions
INSERT INTO institutions (name, type, address, phone, email) VALUES
('University of Rwanda', 'University', 'Kigali, Rwanda', '+250788123456', 'info@ur.ac.rw'),
('Kigali Institute of Technology', 'Technical Institute', 'Kigali, Rwanda', '+250787123456', 'info@kit.ac.rw'),
('Rwanda Polytechnic', 'Polytechnic', 'Kigali, Rwanda', '+250786123456', 'info@rp.ac.rw')
ON DUPLICATE KEY UPDATE name=name;

-- Insert sample companies
INSERT INTO companies (name, industry, size, address, phone, email) VALUES
('RwandaTech Ltd', 'Technology', 'Medium', 'Kigali, Rwanda', '+250785123456', 'info@rwandatech.rw'),
('Bank of Kigali', 'Banking', 'Large', 'Kigali, Rwanda', '+250784123456', 'careers@bk.rw'),
('MTN Rwanda', 'Telecommunications', 'Large', 'Kigali, Rwanda', '+250783123456', 'careers@mtn.rw')
ON DUPLICATE KEY UPDATE name=name;
