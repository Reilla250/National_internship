@echo off
echo Creating production ZIP for Vercel...
cd /d "C:\Users\Pazzo\Desktop\internship-system"

echo Compressing files for Vercel deployment...
powershell -Command "Compress-Archive -Path @('.env', 'package.json', 'package-lock.json', 'src', 'public', 'vercel.json', 'tailwind.config.js', '.eslintrc.js') -DestinationPath vercel-deploy.zip -Force"

echo ✅ vercel-deploy.zip created successfully!
echo 📁 File location: C:\Users\Pazzo\Desktop\internship-system\vercel-deploy.zip
echo 🚀 Ready to upload to Vercel!
pause
