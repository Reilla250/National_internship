@echo off
"C:\Program Files\JetBrains\IntelliJ IDEA 2025.3.4\plugins\maven\lib\maven3\bin\mvn.cmd" spring-boot:run -Dmaven.compiler.skip=true -Dmaven.test.skip=true -DskipTests
