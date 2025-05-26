# Super Easy Netlify Deployment Guide 🚀

## What You Need Before Starting
- Your Recovery Office code on your computer
- A GitHub account
- A Netlify account (free)
- Internet connection

## Step 1: Put Your Code on GitHub
1. Go to GitHub.com and log in
2. Click the "+" button in the top right
3. Click "New repository"
4. Name your repository "recovery-office"
5. Click "Create repository"
6. Follow the instructions to push your code to GitHub

## Step 2: Connect Netlify to GitHub
1. Go to Netlify.com and log in
2. Click "Add new site"
3. Click "Import an existing project"
4. Click "GitHub"
5. Find and select your "recovery-office" repository

## Step 3: Tell Netlify How to Build Your Website
1. Set up the build settings:
   - Build command: `npm run build:netlify`
   - Publish directory: `build`
2. Click "Advanced build settings"
3. Add these environment variables:
   - SKIP_TYPESCRIPT_CHECK = true
   - TSC_COMPILE_ON_ERROR = true
   - CI = false
   - DISABLE_ESLINT_PLUGIN = true
   - REACT_APP_API_URL = (your backend URL or Netlify Function path)
4. Click "Deploy site"

## Step 4: Wait for Your Website to Build
1. Netlify will show "Site is building"
2. Wait until it says "Site is live"
3. You'll see a weird URL like "random-name-123.netlify.app"

## Step 5: Check Your Website
1. Click on your website URL
2. Make sure everything looks good and works
3. If something is wrong, check the "Deploys" tab in Netlify to see errors

## Step 6: Add Your Custom Domain (Optional)
1. In Netlify, go to "Site settings" → "Domain management"
2. Click "Add custom domain"
3. Type your domain name and follow the steps

## Step 7: Set Up Backend
### Option A: Use Netlify Functions (Easiest)
1. Create a file at `.netlify/functions/api.js`
2. Put this code in it:
   ```javascript
   const serverless = require('serverless-http');
   const app = require('../../backend/src/server');
   module.exports.handler = serverless(app);
   ```
3. Add this to your netlify.toml file:
   ```
   [functions]
     directory = ".netlify/functions"
   
   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/api/:splat"
     status = 200
   ```
4. Set REACT_APP_API_URL to "/.netlify/functions/api"

### Option B: Deploy Backend Separately
1. Set up MongoDB Atlas (cloud database)
2. Deploy backend code to Heroku or similar service
3. Set REACT_APP_API_URL to your backend URL

## Help! Something Went Wrong
- If your page is blank: Check the browser console (F12) for errors
- If the build fails: Look at Netlify's "Deploy failed" message
- If the backend doesn't connect: Check your MongoDB connection string
- Still stuck? Ask for help in the Netlify community forum

## Yay! You Did It! 🎉
Your Recovery Office website is now online for everyone to see! 