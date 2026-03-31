@echo off
"C:\Program Files\Apache\Maven\apache-maven-3.9.12\bin\mvn.cmd" spring-boot:run -Dmaven.compiler.skip=true -Dmaven.test.skip=true -Dspring-boot.run.noverify=true
