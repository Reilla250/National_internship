@echo off
echo ============================================
echo Internship System - Java Version Check
echo ============================================
echo.

echo Current Java version:
java -version
echo.

echo ============================================
echo IMPORTANT NOTES:
echo ============================================
echo.
echo 1. The project is configured for Java 17 in pom.xml
echo 2. If you have Java 25 installed, you may need to:
echo    - Install Java 17 or 21
echo    - Configure IntelliJ IDEA to use the correct JDK
echo    - Or update the pom.xml java.version property
echo.
echo 3. Database is now configured to use H2 (in-memory)
echo    - No MySQL setup required
echo    - H2 Console: http://localhost:8080/h2-console
echo.
echo 4. To run in IntelliJ IDEA:
echo    - Open the project in IntelliJ IDEA
echo    - Right-click InternshipApplication.java
echo    - Select "Run 'InternshipApplication.main()'"
echo.
echo 5. Demo accounts are available in SETUP_INSTRUCTIONS.md
echo.

pause
