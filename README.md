
National Internship
Final Course Project

National Digital Internship and Industry Collaboration Management System NDIMS

A complete full stack web platform for managing national internships and industry academia collaboration

Tech Stack

Frontend
React 18
React Router version 6
Recharts
Tailwind CSS

Backend
Java 17
Spring Boot 3.2
Spring Security plus JWT

Database
MySQL 8.0
Spring Data JPA Hibernate

Authentication
JWT Bearer Tokens
BCrypt password hashing

System Actors and Dashboards

Student
Dashboard
Browse Internships
Applications
Weekly Reports
Evaluations
Certificates

Company
Dashboard
Manage Internships
Review Applications
Collaborations

Supervisor
Dashboard
My Students
Review Reports
Submit Evaluations

Institution
Dashboard
Student Monitoring
Certificate Issue and Verify

Government
National Dashboard with KPIs charts and analytics
Reports tab

Admin
Full Dashboard
User management
System statistics
Charts

Project Structure

internship system

database folder contains schema SQL for MySQL schema and seed data

backend internship backend folder

source main Java com internship

entity folder contains 12 JPA entities
repository folder contains 12 Spring Data repositories
service folder contains 10 business logic services
controller folder contains 10 REST controllers
dto folder contains 7 DTO classes
security folder contains JWT filter utilities and user details service
config folder contains security configuration CORS and RBAC
exception folder contains global exception handler

frontend internship frontend folder

source folder contains

context folder for AuthContext JWT state
services folder for API calls using Axios endpoints
components folder for layout sidebar UI components protected routes
pages folder

auth pages login register

student pages dashboard browse internships applications reports evaluations certificates

company pages dashboard internships applications collaboration

supervisor pages dashboard students reports evaluations

institution pages dashboard students

government pages dashboard overview analytics reports tabs

admin pages dashboard overview user management tabs

Quick Start

Database setup
Run MySQL command to import schema SQL file from database folder

Backend setup
Go to backend internship backend folder
Update database credentials in application properties file
Set MySQL username and password
Run Maven Spring Boot application
API runs on localhost port 8080

Frontend setup
Go to frontend internship frontend folder
Run npm install
Run npm start
Application runs on localhost port 3000

API Endpoints

Authentication
POST api auth register register user
POST api auth login login and return JWT token

Internships
GET api internships get all internships
GET api internships search public search
POST api internships company id create internship company role
PUT api internships id update internship company role
PATCH api internships id status update status company role
DELETE api internships id delete internship company role

Applications
POST api applications student id apply student role
GET api applications student id view student applications
GET api applications company id view company applications
PATCH api applications id status update application company role

Reports
POST api reports student id submit report student role
GET api reports student id view reports student and supervisor
GET api reports internship id supervisor view reports
PATCH api reports id review supervisor review report

Evaluations
POST api evaluations supervisor id submit evaluation supervisor role
GET api evaluations student id view student evaluations
GET api evaluations supervisor id view supervisor evaluations

Certificates
POST api certificates generate institution role
GET api certificates student id view certificates student role
GET api certificates verify code public verification

Collaborations
GET api collaborations view all
POST api collaborations create company or institution role
PATCH api collaborations id status update company or institution role

Dashboard
GET api government stats government and admin role
GET api admin stats admin role
GET api admin users admin role

System Flow

Student registers and logs in
Student searches internships
Student applies for internship
Company reviews applications and accepts or rejects
Student submits weekly reports as digital logbook
Supervisor reviews reports and submits evaluation
Institution validates internship and issues certificate
Certificate is downloadable with unique verification code
Government views national analytics dashboard

Security

JWT authentication for all protected routes
Role based access control using PreAuthorize
BCrypt password hashing
CORS configured for React frontend
Global exception handling with proper status codes

Future Enhancements

Mobile application using React Native
AI based internship matching system
National digital ID integration
Real time notifications using WebSocket
HR platform integrations
Email notification system


