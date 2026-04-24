@echo off
echo ========================================================
echo   National Digital Internship System - Master Starter
echo ========================================================
echo.

echo [1] Checking Java Installation...
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Java not found! Please install Java before running.
    pause
    exit /b 1
)
echo [OK] Java found!
echo.

echo [2] Checking Database...
echo IMPORTANT: Please ensure XAMPP (MySQL) is currently RUNNING.
echo If it's not running, open the XAMPP Control Panel and start MySQL now.
echo Press any key when you are sure the database is ready...
rem pause >nul
echo.

echo [3] Finding Maven...
set "MVN_PATH="

:: Check the working JetBrains path first
if exist "C:\Program Files\JetBrains\IntelliJ IDEA 2025.3.4\plugins\maven\lib\maven3\bin\mvn.cmd" (
    set "MVN_PATH=C:\Program Files\JetBrains\IntelliJ IDEA 2025.3.4\plugins\maven\lib\maven3\bin\mvn.cmd"
) else if exist "C:\Program Files\Apache\Maven\apache-maven-3.9.12\bin\mvn.cmd" (
    set "MVN_PATH=C:\Program Files\Apache\Maven\apache-maven-3.9.12\bin\mvn.cmd"
)

if "%MVN_PATH%"=="" (
    echo [ERROR] Maven not found in the expected JetBrains or Apache paths.
    pause
    exit /b 1
)
echo [OK] Maven found at: %MVN_PATH%
echo.

echo [4] Starting Backend (Spring Boot)...
start "Backend API" cmd /c "cd /d "%~dp0backend\internship-backend" && title Backend API Server && "%MVN_PATH%" spring-boot:run -Dmaven.compiler.skip=true -Dmaven.test.skip=true && echo Backend has stopped... && pause"
echo [OK] Backend initialization window started.
echo.

echo [5] Starting Frontend (React)...
start "Frontend UI" cmd /c "cd /d "%~dp0" && title Frontend React App && npm start && echo Frontend has stopped... && pause"
echo [OK] Frontend initialization window started.
echo.

echo ========================================================
echo DONE! The system components are starting in new windows.
echo.
echo - Background: Backend API runs on port 8080
echo - Foreground: Frontend UI will automatically open in 
echo   your web browser at http://localhost:3000
echo.
echo Quick Login Democredentials:
echo   Admin:       admin@internship.com      / admin123
echo   Student:     student@internship.com    / student123
echo   Company:     company@internship.com    / company123
echo   Supervisor:  supervisor@internship.com / supervisor123
echo ========================================================
pause
