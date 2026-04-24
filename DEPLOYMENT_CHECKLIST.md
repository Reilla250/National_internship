# 🚀 Deployment Checklist: Render + Vercel + TiDB Cloud

## ✅ Pre-Deployment Checklist

### Backend Preparation
- [x] render.yaml configured for TiDB Cloud
- [x] Dockerfile ready for deployment
- [x] TiDB Cloud credentials configured
- [ ] Update CORS for production domains
- [ ] Commit and push latest changes

### Frontend Preparation  
- [x] vercel.json exists
- [ ] Update vercel.json with Render backend URL
- [ ] Remove proxy from package.json
- [ ] Update environment variables for production

---

## 📋 Step-by-Step Deployment Instructions

### Step 1: Backend Deployment to Render

#### 1.1 Update CORS Configuration
**File**: `backend/internship-backend/src/main/resources/application.properties`
```properties
app.cors.allowed-origins=http://localhost:3000,https://*.vercel.app
```

#### 1.2 Commit and Push Changes
```bash
git add .
git commit -m "Configure for Render deployment with TiDB Cloud"
git push origin main
```

#### 1.3 Deploy to Render
1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect GitHub: `Reilla250/National_internship`
4. Configure:
   - Name: `internship-backend`
   - Root Directory: `backend/internship-backend`
   - Runtime: Docker
   - Instance Type: Free
5. Environment Variables (already in render.yaml):
   ```
   PORT=8085
   DB_HOST=jdbc:mysql://gateway01.eu-central-1.prod.aws.tidbcloud.com:4000/internship_db?useSSL=true&allowPublicKeyRetrieval=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC&enabledTLSProtocols=TLSv1.2,TLSv1.3
   DB_USER=3jMrabZWjdqqmw9.root
   DB_PASSWORD=6QWm64HjDfYkgQLc
   DB_NAME=internship_db
   ```
6. Click "Create Web Service"

#### 1.4 Verify Backend Deployment
- Wait for deployment to complete
- Test: `https://your-backend-url.onrender.com/api/institution`
- Should return JSON with institutions

### Step 2: Frontend Deployment to Vercel

#### 2.1 Update Vercel Configuration
**File**: `vercel.json`
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

#### 2.2 Deploy to Vercel
```bash
npm i -g vercel
vercel
```

#### 2.3 Configure Vercel Environment Variables
In Vercel dashboard → Settings → Environment Variables:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

#### 2.4 Redeploy Frontend
```bash
vercel --prod
```

### Step 3: Final Verification

#### 3.1 Test Complete Flow
1. Visit your Vercel frontend URL
2. Try registration (should work without OTP)
3. Try login with registered credentials
4. Verify institutions are loaded from TiDB Cloud

#### 3.2 Test API Endpoints
- Institutions: `https://your-backend-url.onrender.com/api/institution`
- Database Health: `https://your-backend-url.onrender.com/api/database/health`

---

## 🔧 Post-Deployment Configuration

### Update Production URLs
Replace placeholder URLs with your actual deployed URLs:
- `your-backend-url.onrender.com` → Your actual Render URL
- `your-frontend-url.vercel.app` → Your actual Vercel URL

### Monitor Logs
- Render: Check logs in Render dashboard
- Vercel: Check logs in Vercel dashboard
- TiDB Cloud: Monitor database performance

---

## 🚨 Troubleshooting

### Common Issues
1. **CORS Errors**: Update allowed origins in application.properties
2. **Database Connection**: Verify TiDB Cloud credentials
3. **Frontend-Backend Connection**: Check Vercel rewrites configuration
4. **Environment Variables**: Ensure all required variables are set

### Quick Fixes
- Backend 503: Check Render logs for startup errors
- Frontend connection errors: Verify API URL and rewrites
- Registration failures: Check database connection and logs

---

## 📞 Support

If you encounter issues:
1. Check Render and Vercel logs
2. Verify environment variables
3. Test API endpoints directly
4. Ensure TiDB Cloud is accessible

Your system is ready for production deployment! 🎉
