@echo off
echo Creating updated deployment ZIP files...

cd /d "C:\Users\Pazzo\Desktop\internship-system\backend\internship-backend"
powershell -Command "Compress-Archive -Path * -DestinationPath ..\..\internship-backend-updated.zip -Force"

cd /d "C:\Users\Pazzo\Desktop\internship-system"
powershell -Command "Compress-Archive -Path * -DestinationPath internship-frontend-updated.zip -Force"

echo Updated ZIP files created successfully!
echo Backend: internship-backend-updated.zip
echo Frontend: internship-frontend-updated.zip
pause
