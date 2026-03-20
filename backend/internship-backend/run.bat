@echo off
set "MVN_PATH=C:\Program Files\Apache\Maven\apache-maven-3.9.12\bin\mvn.cmd"
if not exist "%MVN_PATH%" set "MVN_PATH=C:\Program Files\JetBrains\IntelliJ IDEA 2025.3.2\plugins\maven\lib\maven3\bin\mvn.cmd"
"%MVN_PATH%" spring-boot:run
