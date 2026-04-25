# 🚀 Production Deployment Guide - Render + Vercel + TiDB Cloud

## Current Status
✅ **Backend**: Deployed to Render - `https://national-internship-3-gpza.onrender.com`  
✅ **Database**: TiDB Cloud - Connected and working  
🔄 **Frontend**: Ready to deploy to Vercel  
🔄 **CORS**: Configuration updated for production  

---

## ✅ Configuration Updates Made

### 1. Backend CORS Configuration Updated
**File**: `backend/internship-backend/src/main/resources/application.properties`
```properties
app.cors.allowed-origins=http://localhost:3000,http://127.0.0.1:3000,https://*.onrender.com,https://*.vercel.app,https://national-internship-3-gpza.onrender.com
```

### 2. Frontend API Configuration Updated
**File**: `vercel.json`
```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://national-internship-3-gpza.onrender.com/api/$1"
    }
  ]
}
```

**File**: `.env`
```env
REACT_APP_API_URL=https://national-internship-3-gpza.onrender.com
```

---

## 📋 Next Steps: Deploy Frontend to Vercel

### Step 1: Create Updated ZIP Package
You need to create a new ZIP file with the updated configurations:

**Method A - Using PowerShell:**
```powershell
cd "C:\Users\Pazzo\Desktop\internship-system"
Compress-Archive -Path * -DestinationPath internship-frontend-updated.zip -Force
```

**Method B - Using File Explorer:**
1. Select all files in `C:\Users\Pazzo\Desktop\internship-system`
2. Right-click → Send to → Compressed (zipped) folder
3. Name it: `internship-frontend-updated.zip`

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Choose "Upload" (not Git import)
4. Upload `internship-frontend-updated.zip`
5. Configure deployment settings:
   - **Framework Preset**: Create React App
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Node Version**: `18.x`

### Step 3: Set Environment Variables in Vercel
In Vercel dashboard → Settings → Environment Variables:
```
REACT_APP_API_URL=https://national-internship-3-gpza.onrender.com
```

### Step 4: Deploy
Click "Deploy" and wait for deployment to complete.

---

## 🔧 Backend Redeployment (Optional)

If you need to redeploy the backend with updated CORS:

1. Create updated backend ZIP:
```powershell
cd "C:\Users\Pazzo\Desktop\internship-system\backend\internship-backend"
Compress-Archive -Path * -DestinationPath ..\..\internship-backend-updated.zip -Force
```

2. Go to your Render dashboard
3. Select your service: `national-internship-i7zp`
4. Click "Manual Deploy"
5. Upload `internship-backend-updated.zip`

---

## 🧪 Testing Production Setup

### Test Backend API
```bash
# Test institutions endpoint
curl https://national-internship-3-gpza.onrender.com/api/institution

# Test database health
curl https://national-internship-3-gpza.onrender.com/api/database/health
```

### Test Frontend
1. Visit your Vercel URL
2. Try registration (should work without OTP)
3. Try login with registered credentials
4. Verify institutions are loaded

---

## 📊 Expected Production URLs

- **Backend**: `https://national-internship-3-gpza.onrender.com`
- **Frontend**: `https://your-app-name.vercel.app`
- **Database**: TiDB Cloud (already configured)

---

## 🚨 Troubleshooting

### CORS Issues
If you get CORS errors:
1. Ensure backend is redeployed with updated CORS configuration
2. Check that Vercel domain is included in CORS allowed origins

### Connection Issues
If frontend can't connect to backend:
1. Verify `REACT_APP_API_URL` is set correctly in Vercel
2. Check that vercel.json rewrites are configured properly
3. Test backend API directly first

### Registration/Login Issues
1. Check backend logs in Render dashboard
2. Verify TiDB Cloud connection is working
3. Ensure all required environment variables are set

---

## 🎯 Production Features

Your deployed system will have:
- ✅ **No OTP Required**: Instant registration
- ✅ **TiDB Cloud Database**: 27 Rwandan institutions
- ✅ **JWT Authentication**: Secure login system
- ✅ **CORS Enabled**: Cross-origin requests allowed
- ✅ **Production Ready**: Scalable and reliable

---

## 📞 Quick Checklist Before Going Live

- [ ] Backend deployed and accessible
- [ ] Frontend deployed with correct API URL
- [ ] CORS configuration working
- [ ] Registration flow tested
- [ ] Login flow tested
- [ ] Institutions loading correctly
- [ ] No console errors in browser

Ready to deploy your frontend to Vercel! 🚀
