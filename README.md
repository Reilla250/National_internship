# 🌍 National Digital Internship & Industry Collaboration Management System (NDIMS)

![Status](https://img.shields.io/badge/status-active-success)
![Backend](https://img.shields.io/badge/backend-SpringBoot-green)
![Frontend](https://img.shields.io/badge/frontend-React-blue)
![Database](https://img.shields.io/badge/database-MySQL-orange)
![License](https://img.shields.io/badge/license-Academic-lightgrey)

## 🚀 Live Demonstration
- **Frontend Portal**: [https://national-internship-4.onrender.com](https://national-internship-4.onrender.com)
- **Backend API Base**: [https://national-internship-3-gpza.onrender.com](https://national-internship-3-gpza.onrender.com)

---

## 📌 Overview

**NDIMS** is a full-stack web platform designed to digitize and manage national internship programs while strengthening collaboration between:

* 🎓 Students
* 🏢 Companies
* 🧑‍🏫 Supervisors
* 🏫 Institutions
* 🏛 Government

The system improves transparency, efficiency, and communication across all stakeholders.

---

## 🎯 Objectives

* Centralize internship management
* Automate student application and tracking
* Enable real-time monitoring and evaluation
* Provide national-level analytics and reporting
* Improve collaboration between academia and industry

---

## 🛠 Tech Stack

### 🔹 Frontend

* React 18
* React Router v6
* Tailwind CSS
* Recharts
* Axios

### 🔹 Backend

* Java 17
* Spring Boot 3.2
* Spring Security
* JWT Authentication
* BCrypt Password Encryption

### 🔹 Database

* MySQL 8.0
* Spring Data JPA (Hibernate)

---

## 👥 System Actors & Functionalities

### 🎓 Student

* Browse internships
* Apply for opportunities
* Submit weekly reports
* View evaluations
* Download certificates

### 🏢 Company

* Post internship opportunities
* Review applications
* Manage interns
* Collaborate with institutions

### 🧑‍🏫 Supervisor

* Monitor assigned students
* Review reports
* Submit evaluations

### 🏫 Institution

* Track student progress
* Validate internship completion
* Issue certificates

### 🏛 Government

* View national analytics dashboard
* Monitor KPIs and trends
* Generate reports

### ⚙️ Admin

* Manage users
* Monitor system performance
* Control platform settings

---

## 🧱 System Architecture

```
Frontend (React)
   ↓ API Requests
Backend (Spring Boot)
   ↓ Business Logic
Spring Security (JWT)
   ↓
Database (MySQL)
```

---

## 📁 Project Structure

```
internship-system/
│
├── database/
│   └── schema.sql
│
├── backend/
│   └── internship-backend/
│       ├── entity/
│       ├── repository/
│       ├── service/
│       ├── controller/
│       ├── dto/
│       ├── security/
│       ├── config/
│       └── exception/
│
└── frontend/
    └── internship-frontend/
        ├── context/
        ├── services/
        ├── components/
        └── pages/
```

---

## 🔄 System Workflow

1. Student registers and logs in
2. Student applies for internships
3. Company reviews applications
4. Student submits weekly reports
5. Supervisor evaluates performance
6. Institution validates internship
7. Certificate is generated
8. Government monitors analytics

---

## ⚙️ Installation Guide

### 1️⃣ Database Setup

```
mysql -u root -p < database/schema.sql
```

---

### 2️⃣ Backend Setup

```
cd backend/internship-backend
mvn spring-boot:run
```

Runs at: http://localhost:8080

---

### 3️⃣ Frontend Setup

```
cd frontend/internship-frontend
npm install
npm start
```

Runs at: http://localhost:3000

---

## 🔐 Security Features

* JWT Authentication
* Role-Based Access Control (RBAC)
* BCrypt password hashing
* Secure REST APIs
* CORS configuration

### ⚠️ **IMPORTANT SECURITY NOTICE**

**DEMO ACCOUNTS ARE PERMANENTLY DISABLED**

This NDIMS system is configured for **PRODUCTION USE ONLY**:

- ❌ **No Demo Accounts**: No hardcoded demo credentials exist
- ❌ **No Default Access**: All users must register through proper process
- ✅ **Secure Authentication**: BCrypt password hashing with JWT tokens
- ✅ **Role-Based Access**: Proper authorization controls implemented

### 🔒 **Security Measures Implemented**

1. **Backend Security**:
   - All demo accounts removed from `DataInitializer.java`
   - BCrypt password hashing (strength 10)
   - JWT token-based authentication
   - Role-based access control

2. **Frontend Security**:
   - Production system notices on all auth forms
   - No hardcoded credentials anywhere in code
   - Secure form validation

3. **Database Security**:
   - Encrypted password storage
   - No default or test accounts in database
   - Proper user registration flow

### 🚫 **PROHIBITED ACTIONS**

**NEVER** add demo accounts to this system:
- Do not modify `DataInitializer.java` to add test accounts
- Do not hardcode credentials in frontend code
- Do not document demo credentials anywhere
- Do not expose default passwords in configuration

### ✅ **Production Ready Status**

Your NDIMS system is fully secured and ready for production deployment with:
- Zero security vulnerabilities from demo accounts
- Complete authentication system
- Professional user registration flow
- Comprehensive role-based authorization

---

## 📊 Key Features

* Internship Management System
* Digital Logbook (Weekly Reports)
* Evaluation & Grading System
* Certificate Generation & Verification
* National Analytics Dashboard

---

## 🚀 Future Improvements

* Mobile Application (React Native)
* AI-based internship matching
* Real-time notifications
* Email integration
* National ID system integration

---

## 🤝 Contribution

This project is developed for academic and learning purposes.

---

## 👨‍💻 Author

**Patric Tuyisenge**

---

⭐ NDIMS v1.0 — Smart Internship Management System
