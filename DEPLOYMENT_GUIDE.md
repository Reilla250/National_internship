# NDIMS Deployment Guide

## Overview
This guide covers deploying the National Digital Internship Management System (NDIMS) with:
- **Backend**: Spring Boot (Java 17)
- **Frontend**: React
- **Database**: MySQL (or H2 for testing)

---

## Option 1: Local Development Deployment

### Prerequisites
1. **Java 17** installed
2. **Node.js 18+** installed
3. **MySQL 8.0+** installed (or use provided cloud database)
4. **Maven 3.9+** installed

### Step 1: Database Setup

**Option A - Use existing cloud database (already configured):**
- Database is already configured in `application.properties`
- No action needed

**Option B - Use local MySQL:**
```sql
-- Create database
CREATE DATABASE internship_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user (optional)
CREATE USER 'internship_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON internship_db.* TO 'internship_user'@'localhost';
FLUSH PRIVILEGES;
```

Update `backend/internship-backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/internship_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=internship_user
spring.datasource.password=your_password
```

### Step 2: Start Backend

**Windows (using provided batch file):**
```cmd
cd C:\Users\Pazzo\Desktop\internship-system
start-backend.bat
```

**Or manual Maven:**
```cmd
cd C:\Users\Pazzo\Desktop\internship-system\backend\internship-backend
mvn clean spring-boot:run -DskipTests
```

**Verify backend is running:**
- Open: http://localhost:8080/api/institution
- Should return JSON list of institutions

### Step 3: Start Frontend

```cmd
cd C:\Users\Pazzo\Desktop\internship-system
npm start
```

**Frontend will open at:** http://localhost:3000

---

## Option 2: Production Build Deployment

### Step 1: Build Frontend
```cmd
cd C:\Users\Pazzo\Desktop\internship-system
npm run build
```

This creates a `build/` folder with static files.

### Step 2: Build Backend JAR
```cmd
cd C:\Users\Pazzo\Desktop\internship-system\backend\internship-backend
mvn clean package -DskipTests
```

JAR file created at: `target/internship-backend-1.0.0.jar`

### Step 3: Deploy Backend
```cmd
cd C:\Users\Pazzo\Desktop\internship-system\backend\internship-backend\target
java -jar internship-backend-1.0.0.jar
```

### Step 4: Serve Frontend
Option A - Copy `build/` folder to any static web server (Nginx, Apache)

Option B - Use serve package:
```cmd
npm install -g serve
serve -s build -l 3000
```

---

## Option 3: Docker Deployment

### Step 1: Build Backend Docker Image
```cmd
cd C:\Users\Pazzo\Desktop\internship-system\backend\internship-backend
docker build -t internship-backend .
```

### Step 2: Run Backend Container
```cmd
docker run -d -p 8080:8080 --name ndims-backend internship-backend
```

### Step 3: Build Frontend Docker Image
Create `C:\Users\Pazzo\Desktop\internship-system\Dockerfile.frontend`:
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```cmd
cd C:\Users\Pazzo\Desktop\internship-system
docker build -f Dockerfile.frontend -t internship-frontend .
docker run -d -p 3000:80 --name ndims-frontend internship-frontend
```

### Step 4: Using Docker Compose (All-in-one)

Create `C:\Users\Pazzo\Desktop\internship-system\docker-compose.yml`:
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: ndims-mysql
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: internship_db
      MYSQL_USER: internship_user
      MYSQL_PASSWORD: internship_pass
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  backend:
    build: ./backend/internship-backend
    container_name: ndims-backend
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/internship_db?useSSL=false&serverTimezone=UTC
      SPRING_DATASOURCE_USERNAME: internship_user
      SPRING_DATASOURCE_PASSWORD: internship_pass
    depends_on:
      - mysql

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    container_name: ndims-frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

volumes:
  mysql_data:
```

Run everything:
```cmd
cd C:\Users\Pazzo\Desktop\internship-system
docker-compose up -d
```

---

## Option 4: Cloud Deployment (Vercel + Render + TiDB Cloud)

### Step 1: Deploy Backend to Render

#### 1.1 Push Code to GitHub
```cmd
git add .
git commit -m "Ready for Render deployment with TiDB Cloud"
git push origin main
```

#### 1.2 Deploy to Render
1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository: `Reilla250/National_internship`
4. Configure:
   - **Name**: `internship-backend`
   - **Root Directory**: `backend/internship-backend`
   - **Runtime**: Docker
   - **Build Command**: (auto-detected from Dockerfile)
   - **Start Command**: (auto-detected from Dockerfile)
   - **Instance Type**: Free

#### 1.3 Set Environment Variables in Render
Add these environment variables:
```
PORT=8085
DB_HOST=jdbc:mysql://gateway01.eu-central-1.prod.aws.tidbcloud.com:4000/internship_db?useSSL=true&allowPublicKeyRetrieval=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC&enabledTLSProtocols=TLSv1.2,TLSv1.3
DB_USER=3jMrabZWjdqqmw9.root
DB_PASSWORD=6QWm64HjDfYkgQLc
DB_NAME=internship_db
```

#### 1.4 Deploy
Click "Create Web Service" - Render will automatically deploy your backend.

### Step 2: Deploy Frontend to Vercel

#### 2.1 Update Vercel Configuration
Update `vercel.json` to point to your Render backend:
```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://your-backend-url.onrender.com/api/$1"
    }
  ]
}
```

#### 2.2 Deploy to Vercel
```cmd
npm i -g vercel
cd C:\Users\Pazzo\Desktop\internship-system
vercel
```

Follow the prompts:
- Link to your Vercel account (or create one)
- Choose project settings
- Deploy!

#### 2.3 Update Frontend Environment Variables
In Vercel dashboard, add environment variable:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

### Step 3: Update CORS Configuration

Update `application.properties` to include your Vercel domain:
```properties
app.cors.allowed-origins=http://localhost:3000,https://your-frontend-url.vercel.app
```

---

## Verification Steps

1. **Backend health check:**
   ```
   GET http://localhost:8080/api/institution
   ```

2. **Test registration:**
   - Open http://localhost:3000/register
   - Fill form and submit
   - Check user created in database

3. **Test login:**
   - Use registered credentials
   - Should redirect to dashboard

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 8080 in use | Change `server.port` in application.properties |
| Database connection failed | Check MySQL is running and credentials correct |
| CORS errors | Update `app.cors.allowed-origins` with frontend URL |
| Frontend won't start | Delete `node_modules` and run `npm install` |

---

## Quick Start (Copy & Run)

**Terminal 1 - Backend:**
```cmd
cd C:\Users\Pazzo\Desktop\internship-system\backend\internship-backend
mvn spring-boot:run -DskipTests
```

**Terminal 2 - Frontend:**
```cmd
cd C:\Users\Pazzo\Desktop\internship-system
npm start
```

**Browser:** http://localhost:3000
