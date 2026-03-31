@echo off
set "JAVA_HOME=C:\Users\Pazzo\.antigravity\extensions\redhat.java-1.12.0-win32-x64\jre\17.0.4.1-win32-x86_64"
set "PATH=%JAVA_HOME%\bin;C:\Program Files\Apache\Maven\apache-maven-3.9.12\bin;%PATH%"
echo Using JAVA_HOME: %JAVA_HOME%
java -version
cd /d "C:\Users\Pazzo\Desktop\internship-system\backend\internship-backend"
"C:\Program Files\Apache\Maven\apache-maven-3.9.12\bin\mvn.cmd" clean spring-boot:run -Dmaven.test.skip=true
pause
