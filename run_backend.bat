@echo off
echo ========================================================
echo   National Digital Internship System - Backend Runner
echo ========================================================
echo.

cd /d "C:\Users\Pazzo\Desktop\internship-system\backend\internship-backend"

echo [1] Finding Maven...
set "MVN_PATH="
if exist "C:\Program Files\JetBrains\IntelliJ IDEA 2025.3.4\plugins\maven\lib\maven3\bin\mvn.cmd" (
    set "MVN_PATH=C:\Program Files\JetBrains\IntelliJ IDEA 2025.3.4\plugins\maven\lib\maven3\bin\mvn.cmd"
) else if exist "C:\Program Files\Apache\Maven\apache-maven-3.9.12\bin\mvn.cmd" (
    set "MVN_PATH=C:\Program Files\Apache\Maven\apache-maven-3.9.12\bin\mvn.cmd"
)

if "%MVN_PATH%"=="" (
    echo [ERROR] Maven not found!
    pause
    exit /b 1
)

echo [2] Starting Spring Boot Backend...
"%MVN_PATH%" spring-boot:run -Dmaven.compiler.skip=true -Dmaven.test.skip=true
echo [OK] Backend started.
