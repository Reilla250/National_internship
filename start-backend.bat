@echo off
echo ================================================
echo   Starting NDIMS Backend Server
echo ================================================
echo.
echo This window will keep the server running.
echo Do NOT close this window while using the application.
echo.
cd /d "C:\Users\Pazzo\Desktop\internship-system\backend\internship-backend"
"C:\Program Files\Apache\Maven\apache-maven-3.9.12\bin\mvn.cmd" spring-boot:run -DskipTests
pause
