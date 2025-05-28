# Recovery Office - Netlify Deployment Guide

## 🚀 Complete Full-Stack Deployment to Netlify

This guide will deploy the entire Recovery Office application (frontend + backend) to Netlify using Netlify Functions for serverless backend functionality.

## 📋 Pre-Deployment Checklist

### ✅ **Files Created/Updated:**
- `netlify.toml` - Netlify configuration with API redirects
- `netlify/functions/` - Serverless backend functions
- `netlify/functions/shared/` - Shared utilities and models
- `src/services/api.ts` - Updated for production URLs
- All Mongoose models copied to Netlify Functions

### ✅ **Environment Variables Required:**
```
MONGODB_URI=mongodb+srv://newdev28:OijCo648dGk1AD6P@cluster0.jk9gqg.mongodb.net/recovery-office?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=production
REACT_APP_ENVIRONMENT=production
```

## 🔧 Deployment Steps

### Step 1: GitHub Repository Setup

1. **Ensure your repository is up to date:**
```bash
git add .
git commit -m "Add Netlify Functions and deployment configuration"
git push origin main
```

2. **Repository structure should include:**
```
recovery-office/
├── netlify/
│   └── functions/
│       ├── services.js
│       ├── clients.js
│       ├── bookings.js
│       ├── dashboard.js
│       ├── health.js
│       ├── package.json
│       └── shared/
│           ├── database.js
│           ├── cors.js
│           └── models/
│               ├── Service.js
│               ├── Client.js
│               └── Booking.js
├── src/
├── public/
├── netlify.toml
└── package.json
```

### Step 2: Netlify Dashboard Configuration

1. **Go to [Netlify Dashboard](https://app.netlify.com/)**

2. **Click "New site from Git"**

3. **Connect your GitHub repository**

4. **Configure build settings:**
   - **Base directory:** `` (leave empty)
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
   - **Functions directory:** `netlify/functions`

### Step 3: Environment Variables

In Netlify Dashboard → Site Settings → Environment Variables, add:

```
MONGODB_URI=mongodb+srv://newdev28:OijCo648dGk1AD6P@cluster0.jk9gqg.mongodb.net/recovery-office?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=production
REACT_APP_ENVIRONMENT=production
```

### Step 4: Deploy

1. **Click "Deploy site"**
2. **Wait for build to complete**
3. **Your site will be available at:** `https://[random-name].netlify.app`

### Step 5: Custom Domain (Optional)

1. **In Netlify Dashboard → Domain Settings**
2. **Add custom domain:** `recovery-office.com`
3. **Configure DNS records as instructed**

## 🧪 Testing Deployment

### Test API Endpoints:

1. **Health Check:**
```
GET https://your-site.netlify.app/api/health
```

2. **Services:**
```
GET https://your-site.netlify.app/api/services
```

3. **Dashboard Analytics:**
```
GET https://your-site.netlify.app/api/dashboard/analytics
```

### Test Frontend:

1. **Homepage:** `https://your-site.netlify.app/`
2. **Services:** `https://your-site.netlify.app/services`
3. **Booking:** `https://your-site.netlify.app/booking`
4. **Dashboard:** `https://your-site.netlify.app/dashboard`

## 🔍 Troubleshooting

### Common Issues:

1. **Build Fails:**
   - Check build logs in Netlify Dashboard
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript errors are resolved

2. **API Calls Fail:**
   - Check Function logs in Netlify Dashboard
   - Verify MongoDB connection string
   - Check CORS configuration

3. **Database Connection Issues:**
   - Verify `MONGODB_URI` environment variable
   - Check MongoDB Atlas network access (allow all IPs: `0.0.0.0/0`)
   - Ensure database user has read/write permissions

### Debug Commands:

```bash
# Test local build
npm run build

# Test TypeScript
npx tsc --noEmit

# Check environment variables
echo $MONGODB_URI
```

## 📊 Expected Results

After successful deployment:

### ✅ **Frontend Features:**
- Professional Recovery Office branding
- Complete booking system
- Responsive design
- Professional navigation
- SEO-optimized meta tags

### ✅ **Backend Features:**
- Serverless API endpoints
- MongoDB Atlas integration
- Real-time dashboard data
- CORS-enabled API
- Professional error handling

### ✅ **Performance:**
- Global CDN distribution
- Automatic SSL certificate
- Fast loading times
- Serverless scalability

## 🔐 Security Features

- **HTTPS by default**
- **Security headers configured**
- **CORS properly configured**
- **Environment variables secured**
- **MongoDB connection encrypted**

## 📈 Monitoring

### Netlify Analytics:
- **Build logs:** Monitor deployment success
- **Function logs:** Debug API issues
- **Site analytics:** Track usage

### MongoDB Atlas:
- **Database monitoring:** Track connections
- **Performance insights:** Optimize queries
- **Security alerts:** Monitor access

## 🚀 Production URLs

After deployment, your Recovery Office will be available at:

- **Frontend:** `https://[your-site].netlify.app`
- **API Health:** `https://[your-site].netlify.app/api/health`
- **Services API:** `https://[your-site].netlify.app/api/services`
- **Dashboard:** `https://[your-site].netlify.app/dashboard`

## 🔄 Continuous Deployment

Every push to your main branch will automatically:
1. **Trigger a new build**
2. **Run tests and type checking**
3. **Deploy to production**
4. **Update the live site**

## 📞 Support

If you encounter issues:

1. **Check Netlify build logs**
2. **Verify environment variables**
3. **Test MongoDB connection**
4. **Review function logs**

The Recovery Office is now ready for production use with professional financial services hosting on Netlify! 🎉 