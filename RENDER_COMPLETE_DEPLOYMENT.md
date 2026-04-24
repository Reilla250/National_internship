# 🚀 Complete Render Deployment Guide - Backend + Frontend

## Overview
Moving both backend and frontend to Render while keeping TiDB Cloud as the database.

## Current Status
✅ **Backend**: Already deployed to Render - `https://national-internship-i7zp.onrender.com`  
🔄 **Frontend**: Currently on Vercel - moving to Render  
✅ **Database**: TiDB Cloud - staying as is  

## 📋 Configuration Updates Made

### 1. Updated `render.yaml` - Both Services
```yaml
services:
  # Backend Service (existing)
  - type: web
    name: internship-backend
    env: docker
    rootDir: backend/internship-backend
    # ... backend config

  # Frontend Service (new)
  - type: web
    name: internship-frontend
    env: static
    rootDir: ./
    buildCommand: npm run build
    staticPublishPath: ./build
    envVars:
      - key: REACT_APP_API_URL
        value: https://national-internship-i7zp.onrender.com
```

### 2. Updated CORS Configuration
```properties
app.cors.allowed-origins=http://localhost:3000,http://127.0.0.1:3000,https://*.onrender.com,https://*.vercel.app,https://national-internship-i7zp.onrender.com,https://national-internship-frontend.onrender.com
```

### 3. Frontend Environment
```env
REACT_APP_API_URL=https://national-internship-i7zp.onrender.com
```

## 🚀 Deployment Steps

### Step 1: Push Updates to GitHub
```bash
git add backend/internship-backend/render.yaml backend/internship-backend/src/main/resources/application.properties
git commit -m "Configure complete Render deployment - both backend and frontend on Render"
git push origin main
```

### Step 2: Deploy Frontend to Render

#### Option A: Using Updated render.yaml (Recommended)
1. Go to your Render dashboard
2. Find your existing backend service: `national-internship-i7zp`
3. The updated render.yaml will automatically create the frontend service
4. Render will detect the new service and deploy it

#### Option B: Manual Frontend Service
1. Go to Render dashboard
2. Click "New" → "Web Service"
3. Connect GitHub: `Reilla250/National_internship`
4. Configure:
   - **Name**: `internship-frontend`
   - **Environment**: `Static`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `./build`
   - **Instance Type**: Free
5. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://national-internship-i7zp.onrender.com
   ```
6. Click "Create Web Service"

### Step 3: Verify Deployment

#### Backend URL: `https://national-internship-i7zp.onrender.com`
#### Frontend URL: `https://national-internship-frontend.onrender.com`

### Step 4: Test Complete System
1. **Visit frontend**: `https://national-internship-frontend.onrender.com`
2. **Test registration**: Should work without OTP
3. **Test login**: Should authenticate with backend
4. **Test institutions**: Should load from TiDB Cloud

## 🎯 Expected Architecture

```
Frontend (Render Static) → Backend (Render Docker) → Database (TiDB Cloud)
        ↓                        ↓                        ↓
   React App              Spring Boot API         MySQL Compatible
national-internship-   national-internship-    TiDB Cloud
frontend.onrender.com  i7zp.onrender.com
```

## 🔧 Benefits of This Setup

✅ **Unified Platform**: Both services on Render  
✅ **Simplified Management**: One dashboard for both services  
✅ **Better Performance**: Same hosting provider reduces latency  
✅ **Cost Effective**: Both on free tiers  
✅ **Easy Scaling**: Upgrade plans as needed  

## 🚨 Troubleshooting

### If Frontend Doesn't Deploy:
1. Check render.yaml syntax
2. Verify build command: `npm run build`
3. Check build logs in Render dashboard

### If CORS Issues:
1. Verify backend has updated CORS configuration
2. Check that frontend URL is in allowed origins
3. Redeploy backend if needed

### If API Calls Fail:
1. Verify REACT_APP_API_URL is set correctly
2. Check backend is running and accessible
3. Test backend endpoints directly

## 📊 Final URLs After Deployment

- **Frontend**: `https://national-internship-frontend.onrender.com`
- **Backend**: `https://national-internship-i7zp.onrender.com`
- **Database**: TiDB Cloud (unchanged)

## 🎉 Completion Checklist

- [ ] Backend deployed and running
- [ ] Frontend deployed to Render
- [ ] CORS configuration updated
- [ ] Registration flow working
- [ ] Login flow working
- [ ] Institutions loading correctly
- [ ] No console errors

Ready to move everything to Render! 🚀
