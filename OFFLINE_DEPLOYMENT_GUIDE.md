# 🚀 Offline Deployment Guide (No GitHub Required)

## Method 1: Direct Upload to Render (Recommended)

### Step 1: Backend Deployment to Render

#### 1.1 Create ZIP Archive
✅ **Already Done**: `internship-backend.zip` created

#### 1.2 Deploy to Render via Direct Upload
1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Instead of connecting GitHub, choose "Private Git" or "Manual Deploy"
4. Upload the ZIP file: `internship-backend.zip`
5. Configure:
   - **Name**: `internship-backend`
   - **Runtime**: Docker
   - **Instance Type**: Free
   - **Root Directory**: `backend/internship-backend`

#### 1.3 Set Environment Variables in Render
```
PORT=8085
DB_HOST=jdbc:mysql://gateway01.eu-central-1.prod.aws.tidbcloud.com:4000/internship_db?useSSL=true&allowPublicKeyRetrieval=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC&enabledTLSProtocols=TLSv1.2,TLSv1.3
DB_USER=3jMrabZWjdqqmw9.root
DB_PASSWORD=6QWm64HjDfYkgQLc
DB_NAME=internship_db
```

#### 1.4 Deploy
Click "Create Web Service" - Render will deploy from the ZIP file.

### Step 2: Frontend Deployment to Vercel

#### 2.1 Create Frontend ZIP
```powershell
cd "C:\Users\Pazzo\Desktop\internship-system"
Compress-Archive -Path * -DestinationPath internship-frontend.zip -Force
```

#### 2.2 Deploy to Vercel via Direct Upload
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Instead of Git import, choose "Upload"
4. Upload `internship-frontend.zip`
5. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

#### 2.3 Set Environment Variables in Vercel
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

#### 2.4 Update Vercel Configuration
After deployment, go to Vercel dashboard → Settings → Functions → Rewrites and add:
```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://your-backend-url.onrender.com/api/$1"
    }
  ]
}
```

---

## Method 2: Use Render CLI (Alternative)

### Install Render CLI
```bash
npm install -g @render/cli
```

### Deploy Backend
```bash
cd "C:\Users\Pazzo\Desktop\internship-system\backend\internship-backend"
render deploy
```

### Deploy Frontend to Vercel
```bash
cd "C:\Users\Pazzo\Desktop\internship-system"
vercel --prod
```

---

## Method 3: Manual Docker Deployment

### Build and Push Docker Images
```bash
# Build Backend
cd "C:\Users\Pazzo\Desktop\internship-system\backend\internship-backend"
docker build -t internship-backend .

# Deploy to Render via Docker
docker login render.com
docker tag internship-backend render.com/your-username/internship-backend
docker push render.com/your-username/internship-backend
```

---

## 📋 Quick Start - Method 1 (Recommended)

### Right Now - Do This:

1. **Go to render.com**
2. **Click "New" → "Web Service"**
3. **Choose "Manual Deploy" or "Upload ZIP"**
4. **Upload `internship-backend.zip`**
5. **Set environment variables (see above)**
6. **Deploy**

7. **Go to vercel.com**
8. **Click "New Project" → "Upload"**
9. **Upload the frontend ZIP**
10. **Set environment variables**
11. **Deploy**

### After Both Deploy:
1. Get your Render backend URL
2. Update Vercel environment variables with the backend URL
3. Test your live application!

---

## 🔧 Troubleshooting

### If Upload Fails:
- Check ZIP file size (should be < 100MB)
- Ensure all necessary files are included
- Verify Dockerfile is in the correct location

### If Backend Doesn't Start:
- Check Render logs for errors
- Verify environment variables are correct
- Ensure TiDB Cloud connection string is accurate

### If Frontend Can't Connect:
- Verify API URL in Vercel environment variables
- Check CORS configuration in backend
- Ensure Vercel rewrites are configured correctly

---

## 🎯 Expected URLs After Deployment

- **Backend**: `https://your-app-name.onrender.com`
- **Frontend**: `https://your-app-name.vercel.app`

Your system will be fully functional with:
- ✅ Backend on Render (Free tier)
- ✅ Frontend on Vercel (Free tier)
- ✅ Database on TiDB Cloud
- ✅ No OTP required

Ready to deploy! 🚀
