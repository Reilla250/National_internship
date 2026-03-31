@echo off
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-25.0.2.10-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"
set "MVN=C:\Program Files\JetBrains\IntelliJ IDEA 2025.3.4\plugins\maven\lib\maven3\bin\mvn.cmd"
cd /d "C:\Users\Pazzo\Desktop\internship-system\backend\internship-backend"
echo Starting Spring Boot backend...
"%MVN%" spring-boot:run
