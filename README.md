
# National Digital Internship & Industry Collaboration Management System (NDIMS)

A full-stack web platform designed to digitize and manage national internship programs while strengthening collaboration between students, companies, institutions, and government.
## Overview

NDIMS is a centralized system that streamlines the entire internship lifecycle including:

* Internship posting and discovery
* Student applications and tracking
* Weekly report submissions (digital logbook)
* Supervisor evaluations
* Institution validation and certification
* Government-level analytics and reporting

It ensures transparency, efficiency, and structured communication across all stakeholders.

---

## Tech Stack

### Frontend

* React 18
* React Router v6
* Tailwind CSS
* Recharts
* Axios

### Backend

* Spring Boot 3.2
* Spring Security
* JWT Authentication
* BCrypt password hashing
* Java 17

### Database

* MySQL 8.0
* Spring Data JPA / Hibernate

---

## Key Features

### Student Module

* Browse available internships
* Apply for internships
* Submit weekly progress reports
* View supervisor evaluations
* Download certificates

### Company Module

* Create and manage internship postings
* Review student applications
* Track interns’ progress
* Manage collaborations

### Supervisor Module

* Monitor assigned students
* Review weekly reports
* Submit performance evaluations

### Institution Module

* Validate internship completion
* Issue digital certificates
* Verify student records

### Government Module

* National analytics dashboard
* Performance KPIs and reporting
* Internship ecosystem monitoring

### Admin Module

* User management
* System-wide analytics
* Platform configuration

---

## System Architecture

Frontend (React)
→ REST API calls
Backend (Spring Boot)
→ Business logic layer
→ Spring Security (JWT authentication)
→ Database layer (MySQL)

---

## Project Structure

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
## System Workflow

1. Student registers and logs in
2. Student browses and applies for internships
3. Company reviews and approves applications
4. Student submits weekly reports
5. Supervisor evaluates performance
6. Institution validates completion
7. Certificate is issued with verification code
8. Government monitors national analytics

---

## Security Features

* JWT-based authentication
* Role-Based Access Control (RBAC)
* Password encryption using BCrypt
* Secure REST APIs
* CORS configuration for frontend communication

---

## Installation Guide

### 1. Database Setup

```
mysql -u root -p < database/schema.sql
```

### 2. Backend Setup

```bash
cd backend/internship-backend
mvn spring-boot:run
```

Update database credentials in:

```
src/main/resources/application.properties
```

Backend runs at:

```
http://localhost:8080
```

### 3. Frontend Setup

```
cd frontend/internship-frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

## Future Improvements

* Mobile app (React Native)
* AI-based internship matching
* Real-time notifications (WebSocket)
* Email notification system
* National digital ID integration
* HR system integrations

## Author

Developed as a final course project for national internship and industry collaboration management.


* make it **more advanced (GitHub “top-level project” style)**
* add **badges (build, license, tech stack icons)**
* or convert it into a **PDF documentation report for submission**
