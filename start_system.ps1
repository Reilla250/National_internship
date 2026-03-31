# National Digital Internship System - Rapid Starter
$ErrorActionPreference = "SilentlyContinue"

Write-Host "🚀 Starting National Digital Internship System..." -ForegroundColor Cyan

# 1. Cleanup old processes
Write-Host "🧹 Cleaning up ports 8080 and 3000..." -ForegroundColor Yellow
$ports = @(8080, 3000)
foreach ($port in $ports) {
    $procId = (Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue).OwningProcess
    if ($procId) {
        Write-Host "Killing process on port $port (PID: $procId)"
        Stop-Process -Id $procId -Force
    }
}

# 2. Start Backend
Write-Host "☕ Starting Backend (Spring Boot)..." -ForegroundColor Green
$mvn = "C:\Program Files\Apache\Maven\apache-maven-3.9.12\bin\mvn.cmd"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'backend\internship-backend'; Write-Host 'Starting Backend...'; & '$mvn' spring-boot:run -Dmaven.compiler.skip=true -Dmaven.test.skip=true"

# 3. Start Frontend
Write-Host "⚛️ Starting Frontend (React)..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'frontend\internship-frontend'; Write-Host 'Starting Frontend...'; npm start"

Write-Host "✅ System startup initiated! Please wait for the terminals to finish loading." -ForegroundColor Green
Write-Host "Web Dashboard will open at http://localhost:3000" -ForegroundColor Cyan
