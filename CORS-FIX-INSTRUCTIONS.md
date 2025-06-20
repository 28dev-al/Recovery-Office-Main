# 🚨 CRITICAL: Recovery Office CORS Configuration Fix

## 🔍 ROOT CAUSE IDENTIFIED
Your Railway backend CORS configuration in `backend/src/server.js` is configured for the **WRONG Netlify domain**:

**Current (WRONG)**: `https://recovery28.netlify.app`  
**Actual (CORRECT)**: `https://recovery-office-online.netlify.app`

## 📍 EXACT LOCATIONS TO FIX

In your Railway backend repository, you need to update **TWO locations** in `backend/src/server.js`:

### Location 1: Lines 82-87 (First allowedOrigins array)
```javascript
// CURRENT (WRONG):
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001', 
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'https://recovery28.netlify.app'  // ← WRONG DOMAIN
];

// UPDATE TO (CORRECT):
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001', 
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'https://recovery-office-online.netlify.app',  // ← CORRECT NETLIFY DOMAIN
  'https://recovery-office.com',                 // ← ADD CUSTOM DOMAIN
  'https://www.recovery-office.com'              // ← ADD WWW VERSION
];
```

### Location 2: Lines 147-152 (Second allowedOrigins array)
```javascript
// CURRENT (WRONG):
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001', 
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'https://recovery28.netlify.app'  // ← WRONG DOMAIN
];

// UPDATE TO (CORRECT):
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001', 
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'https://recovery-office-online.netlify.app',  // ← CORRECT NETLIFY DOMAIN
  'https://recovery-office.com',                 // ← ADD CUSTOM DOMAIN
  'https://www.recovery-office.com'              // ← ADD WWW VERSION
];
```

## 🚀 DEPLOYMENT STEPS

1. **Access your Railway backend repository**
2. **Edit `backend/src/server.js`** and make the above changes
3. **Commit and push changes**:
   ```bash
   git add .
   git commit -m "Fix CORS for Netlify deployment - add recovery-office-online.netlify.app"
   git push origin main
   ```
4. **Railway will auto-deploy** the updated CORS configuration
5. **Test the booking system** at https://recovery-office-online.netlify.app/booking

## ✅ EXPECTED RESULTS AFTER FIX

### Before Fix (Current):
```
❌ Access to fetch at 'https://recovery-office-backend-production.up.railway.app/api/services' 
   from origin 'https://recovery-office-online.netlify.app' 
   has been blocked by CORS policy
```

### After Fix (Expected):
```
✅ [API] Making request to: https://recovery-office-backend-production.up.railway.app/api/services
✅ [API] Success: {status: 'success', results: 4, data: [...]}
✅ Complete booking flow working end-to-end
```

## 🧪 VERIFICATION STEPS

After the backend update is deployed:

1. **Visit**: https://recovery-office-online.netlify.app/booking
2. **Open Browser Console** (F12)
3. **Check for CORS errors**: Should be gone
4. **Test Booking Flow**: Service → Date → Client Info → Confirm
5. **Check Railway Logs**: Should show successful requests from Netlify domain

## 🔧 ADDITIONAL IMPROVEMENTS (Optional)

Consider adding environment variables to your Railway backend for easier management:

```javascript
// In server.js, replace hardcoded origins with:
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : [
      'http://localhost:3000',
      'http://localhost:3001', 
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'https://recovery-office-online.netlify.app'
    ];
```

Then add this environment variable in Railway:
```
ALLOWED_ORIGINS=https://recovery-office-online.netlify.app,https://recovery-office.com,https://www.recovery-office.com,http://localhost:3000,http://localhost:3001
```

## 📊 BACKEND API ENDPOINTS

Your backend is available at: `https://recovery-office-backend-production.up.railway.app`

Key endpoints that need CORS access:
- `/api/services` - Get available services
- `/api/clients` - Create client records  
- `/api/bookings` - Create booking records

## 🎯 SUMMARY

The fix is simple but critical:
1. Change `recovery28.netlify.app` to `recovery-office-online.netlify.app` in TWO places
2. Redeploy the backend
3. Test the booking system

Once this is done, your Recovery Office booking system will work perfectly! 🎉
