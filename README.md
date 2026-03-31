# National Digital Internship & Industry Collaboration Management System (NDIMS)

A complete full-stack web platform for managing national internships and industry–academia collaboration.

---

## Tech Stack

| Layer      | Technology                                             |
|------------|-------------------------------------------------------|
| Frontend   | React 18, React Router v6, Recharts, Tailwind CSS     |
| Backend    | Java 17, Spring Boot 3.2, Spring Security + JWT       |
| Database   | MySQL 8.0, Spring Data JPA / Hibernate                |
| Auth       | JWT Bearer Tokens, BCrypt password hashing            |

---

## System Actors & Dashboards

| Actor        | Dashboard Pages                                                       |
|--------------|-----------------------------------------------------------------------|
| STUDENT      | Dashboard, Browse Internships, Applications, Weekly Reports, Evaluations, Certificates |
| COMPANY      | Dashboard, Manage Internships, Review Applications, Collaborations    |
| SUPERVISOR   | Dashboard, My Students, Review Reports, Submit Evaluations            |
| INSTITUTION  | Dashboard, Student Monitoring, Certificate Issue & Verify             |
| GOVERNMENT   | National Dashboard (KPIs, charts, analytics), Reports tab             |
| ADMIN        | Full Dashboard (user management, system stats, charts)                |

---

## Project Structure

```
internship-system/
├── database/
│   └── schema.sql                     MySQL schema + seed data
│
├── backend/internship-backend/
│   └── src/main/java/com/internship/
│       ├── entity/         12 JPA entities
│       ├── repository/     12 Spring Data repositories
│       ├── service/        10 business logic services
│       ├── controller/     10 REST controllers
│       ├── dto/             7 DTO classes
│       ├── security/        JWT filter, util, UserDetailsService
│       ├── config/          Security config (CORS, RBAC)
│       └── exception/       Global exception handler
│
└── frontend/internship-frontend/
    └── src/
        ├── context/         AuthContext (JWT state)
        ├── services/        api.js (Axios + all endpoints)
        ├── components/      Layout, Sidebar, UI components, ProtectedRoute
        └── pages/
            ├── auth/        Login, Register
            ├── student/     Dashboard, BrowseInternships, Applications,
            │                Reports, Evaluations, Certificates
            ├── company/     Dashboard, Internships, Applications, Collaboration
            ├── supervisor/  Dashboard, Students, Reports, Evaluations
            ├── institution/ Dashboard, Students
            ├── government/  Dashboard (Overview, Analytics, Report tabs)
            └── admin/       Dashboard (Overview + User Management tabs)
```

---

## Quick Start

### 1. Database
```bash
mysql -u root -p < database/schema.sql
```

### 2. Backend
```bash
cd backend/internship-backend
./run.bat
# API runs at http://localhost:8080
```

### 3. Frontend
```bash
cd frontend/internship-frontend
npm install
npm start
# App runs at http://localhost:3000
```

---

## System Flow

1. **Student registers** and logs in.
2. **Student searches** and applies for internships.
3. **Company reviews** applications and accepts/rejects.
4. **Student submits weekly reports** (Digital Logbook).
5. **Supervisor reviews reports** and submits evaluations.
6. **Institution validates** and issues certificates.
7. **Certificate is downloadable** with unique verification code.
8. **Government views national analytics** dashboard.

---

## Security

- **JWT authentication** for all protected routes.
- **Role Based Access Control** using @PreAuthorize.
- **BCrypt password hashing**.
- **CORS configured** for React frontend.
- **Global exception handling** with proper status codes.

---

*Built for Rwanda's National Workforce Development — NDIMS v1.0*
