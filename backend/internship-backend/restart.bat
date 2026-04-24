@echo off
echo Stopping any running Java processes...
taskkill /F /IM java.exe 2>nul
timeout /t 3 /nobreak >nul
echo.
echo Starting Spring Boot Backend...
cd /d "C:\Users\Pazzo\Desktop\internship-system\backend\internship-backend"
"C:\Program Files\Apache\Maven\apache-maven-3.9.12\bin\mvn.cmd" spring-boot:run -DskipTests
pause
