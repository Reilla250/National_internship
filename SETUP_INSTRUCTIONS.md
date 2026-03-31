# Internship Management System - Setup Instructions

## Database Configuration
✅ **Database is configured to use H2 (in-memory) for easy testing**
- The application will automatically create the database schema
- H2 Console is available at: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:internship_db`
- Username: `sa`
- Password: (leave empty)

## IntelliJ IDEA Setup

### 1. Open Project in IntelliJ IDEA
1. Open IntelliJ IDEA
2. Click "Open" and select: `C:\Users\Pazzo\Desktop\internship-system`
3. Wait for the project to load and indexes to build

### 2. Configure Project SDK
1. Go to `File` → `Project Structure` → `Project`
2. Set **Project SDK** to Java 17 or 21 (if available)
3. Set **Project language level** to match the SDK

### 3. Configure Maven
1. Go to `File` → `Settings` → `Build Tools` → `Maven`
2. Ensure Maven home directory is set to: `C:\Program Files\Apache\Maven\apache-maven-3.9.12`
3. Set User settings file if needed

### 4. Run the Application
**Method 1: Using Run Configuration**
1. Right-click on `InternshipApplication.java` (in `backend/internship-backend/src/main/java/com/internship/`)
2. Select "Run 'InternshipApplication.main()'"

**Method 2: Using Maven**
1. Open the Maven tool window (View → Tool Windows → Maven)
2. Expand `internship-backend` → `Plugins` → `spring-boot`
3. Double-click `spring-boot:run`

### 5. Verify Application Startup
The application should start on `http://localhost:8080`
You should see logs indicating:
- Database initialization
- Demo accounts creation
- Server startup

## Login Credentials

Once the application is running, you can use these demo accounts:

### Admin Account
- **Email:** admin@internship.com
- **Password:** admin123

### Student Account
- **Email:** student@internship.com
- **Password:** student123

### Company Account
- **Email:** company@internship.com
- **Password:** company123

### Supervisor Account
- **Email:** supervisor@internship.com
- **Password:** supervisor123

## Testing the System

1. **Backend API**: http://localhost:8080
2. **H2 Database Console**: http://localhost:8080/h2-console
3. **Login Endpoint**: POST http://localhost:8080/api/auth/login

### Frontend Setup (Optional)
If you want to run the frontend:
1. Open a terminal in `frontend/internship-frontend`
2. Run `npm install`
3. Run `npm start`
4. Access at: http://localhost:3000

## Troubleshooting

### Java Version Issues
If you encounter compilation errors with Java 25:
1. Install Java 17 or 21
2. Configure IntelliJ IDEA to use the installed JDK
3. Update project settings to use the compatible Java version

### Lombok Issues
If Lombok causes compilation issues:
1. Install the Lombok plugin in IntelliJ IDEA
2. Enable annotation processing: `Settings` → `Build Tools` → `Compiler` → `Annotation Processors`

### Database Connection Issues
- The application is configured to use H2 (in-memory database)
- No external database setup required
- Database is created automatically on startup

## Project Structure
```
internship-system/
├── backend/
│   └── internship-backend/          # Spring Boot backend
├── frontend/
│   └── internship-frontend/         # React frontend (if available)
├── database/
│   └── schema.sql                   # Database schema (for MySQL)
└── start_system.ps1                 # PowerShell startup script
```

The system is now ready to run in IntelliJ IDEA!
