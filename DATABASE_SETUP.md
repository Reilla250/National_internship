# Database Setup Instructions

## Problem Fixed
The original issue was that your application was configured to use **H2 database** (in-memory) but you were trying to access it through **phpMyAdmin** (which only works with MySQL). This caused the error "#1932 - Table 'internship_db.users' doesn't exist in engine".

## Solution Implemented
1. ✅ Switched from H2 to MySQL in `application.properties`
2. ✅ Created an improved database schema with proper design
3. ✅ Added comprehensive initialization scripts
4. ✅ Enhanced security and data integrity features

## Setup Instructions

### Prerequisites
- MySQL Server installed and running
- phpMyAdmin or MySQL Workbench for database management
- Java Spring Boot application

### Step 1: MySQL Server Setup
1. Install MySQL Server if not already installed
2. Start MySQL service
3. Set root password (default is empty in configuration)

### Step 2: Create Database
```sql
-- Connect to MySQL as root
mysql -u root -p

-- Create database (optional - Spring will create it automatically)
CREATE DATABASE internship_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Step 3: Update MySQL Password (if needed)
If your MySQL root user has a password, update it in:
`backend/internship-backend/src/main/resources/application.properties`

Change line 17:
```properties
spring.datasource.password=your_mysql_password
```

### Step 4: Initialize Database Schema
Run the schema script in phpMyAdmin or MySQL command line:

**Option A: Using phpMyAdmin**
1. Open phpMyAdmin (http://localhost/phpmyadmin)
2. Select `internship_db` database
3. Click "Import" tab
4. Choose `backend/internship-backend/src/main/resources/schema.sql`
5. Click "Go"

**Option B: Using MySQL Command Line**
```bash
mysql -u root -p internship_db < backend/internship-backend/src/main/resources/schema.sql
```

### Step 5: Load Initial Data
Run the data initialization script:

**Option A: Using phpMyAdmin**
1. In phpMyAdmin, select `internship_db` database
2. Click "Import" tab
3. Choose `backend/internship-backend/src/main/resources/data.sql`
4. Click "Go"

**Option B: Using MySQL Command Line**
```bash
mysql -u root -p internship_db < backend/internship-backend/src/main/resources/data.sql
```

### Step 6: Start Spring Boot Application
```bash
cd backend/internship-backend
./mvnw spring-boot:run
```

### Step 7: Verify Setup
1. Open phpMyAdmin
2. Navigate to `internship_db` database
3. You should see all tables including `users`, `roles`, `students`, etc.
4. Check that sample data is loaded

## Default Login Credentials
After setup, you can use these default accounts:

**Admin:**
- Email: `admin@internship.gov.rw`
- Password: `YourHashedPasswordHere` (You'll need to hash a real password)

**Sample Students:**
- Email: `student1@ur.ac.rw`, `student2@ur.ac.rw`, `student3@rp.ac.rw`
- Password: `YourHashedPasswordHere`

**Sample Companies:**
- Email: `andela@company.com`, `bank@kcb.rw`, `tech@yego.rw`
- Password: `YourHashedPasswordHere`

⚠️ **Important:** Update the password hashes in `data.sql` with proper BCrypt hashes before using in production.

## Database Features

### Enhanced Security
- Account lockout after failed attempts
- Email verification tracking
- Password reset tokens
- Audit logging for all changes

### Improved Design
- Proper foreign key constraints
- Enum types for status fields
- Indexes for performance
- Check constraints for data integrity

### Additional Tables
- `audit_logs` - Track all database changes
- `system_settings` - Configurable system parameters
- `notifications` - User notification system
- `system_statistics` - Dashboard metrics

### Views for Common Queries
- `active_internships` - Currently open internships
- `student_applications` - Application details with student info

## Troubleshooting

### Connection Issues
If Spring Boot can't connect to MySQL:
1. Verify MySQL service is running
2. Check connection parameters in `application.properties`
3. Ensure MySQL user has proper privileges
4. Verify firewall isn't blocking port 3306

### Table Creation Issues
If tables aren't created automatically:
1. Check `spring.jpa.hibernate.ddl-auto=update` is set
2. Verify MySQL dialect is correct
3. Check MySQL user has CREATE privileges

### phpMyAdmin Access Issues
If phpMyAdmin shows errors:
1. Verify phpMyAdmin is configured for MySQL
2. Check MySQL service is running
3. Ensure database `internship_db` exists

## Production Considerations

1. **Security:**
   - Use strong passwords
   - Enable SSL connections
   - Restrict database user privileges
   - Regular security updates

2. **Performance:**
   - Configure connection pooling
   - Add appropriate indexes
   - Monitor query performance
   - Regular database maintenance

3. **Backup:**
   - Set up automated backups
   - Test backup restoration
   - Document backup procedures

4. **Monitoring:**
   - Monitor database connections
   - Track slow queries
   - Set up alerting for issues

## Verification Commands

Run these SQL queries to verify setup:

```sql
-- Check all tables exist
SHOW TABLES;

-- Verify user counts
SELECT r.role_name, COUNT(u.user_id) as count 
FROM roles r 
LEFT JOIN users u ON r.role_id = u.role_id 
GROUP BY r.role_name;

-- Check internships
SELECT COUNT(*) as total_internships FROM internships;

-- Verify applications
SELECT status, COUNT(*) as count FROM applications GROUP BY status;
```

Your database is now properly configured with MySQL and should work seamlessly with phpMyAdmin!
