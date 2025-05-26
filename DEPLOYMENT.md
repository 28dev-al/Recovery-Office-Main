# Deployment Guide for Recovery Office

This guide provides step-by-step instructions for deploying the Recovery Office website and backend API to production.

## Table of Contents
- [Frontend Deployment](#frontend-deployment)
- [Backend Deployment](#backend-deployment)
- [Database Setup](#database-setup)
- [Environment Configuration](#environment-configuration)
- [Netlify Functions](#netlify-functions)
- [Testing the Deployment](#testing-the-deployment)
- [Troubleshooting](#troubleshooting)

## Frontend Deployment

### Prerequisites

- Node.js (v16+)
- npm
- Netlify CLI (optional for direct deployments)

### Building for Production

There are several ways to build the frontend project depending on your needs:

#### Standard Build

```bash
npm run build
```

This will create a production build with TypeScript checking enabled.

#### Quick Build (Skip TypeScript Checks)

```bash
npm run build:quick
```

This will create a production build while ignoring TypeScript errors.

#### Netlify-Optimized Build

```bash
npm run deploy:netlify
```

This will create a production build optimized for Netlify deployment, with TypeScript checking disabled.

### Deploying to Netlify

#### Option A: Using Netlify CLI

1. Install Netlify CLI if you don't have it already:
   ```bash
   npm install -g netlify-cli
   ```

2. Build the project:
   ```bash
   npm run deploy:netlify
   ```

3. Deploy to Netlify:
   ```bash
   netlify deploy --prod --dir=build
   ```

#### Option B: Using Netlify's Git Integration (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Connect your repository to Netlify
3. Configure the build settings:
   - Build command: `npm run build:netlify`
   - Publish directory: `build`
4. Netlify will automatically build and deploy using the settings in `netlify.toml`

## Backend Deployment

You can deploy the backend in two ways:
1. As a standalone API service (recommended for production)
2. As Netlify Functions (simpler but more limited)

### Option 1: Standalone Backend Deployment

#### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (for database)
- Hosting service (Heroku, Render, Digital Ocean, AWS, etc.)

#### Steps for Deployment

1. Prepare the backend for deployment:
   ```bash
   cd backend
   npm install --production
   ```

2. Set up environment variables on your hosting platform:
   - `NODE_ENV=production`
   - `PORT=8080` (or as required by your host)
   - `MONGODB_URI=mongodb+srv://username:password@your-cluster.mongodb.net/recovery-office`
   - `JWT_SECRET=your-secure-jwt-secret`
   - `JWT_EXPIRES_IN=7d`
   - Additional variables as needed for email, Redis, etc.

3. Deploy to your hosting service following their documentation. Example for Heroku:
   ```bash
   heroku create recovery-office-api
   git subtree push --prefix backend heroku main
   ```

4. Update frontend API endpoint to point to your backend service:
   - Create/update `.env` in the root directory with:
     ```
     REACT_APP_API_URL=https://your-backend-service.com/api
     ```

### Option 2: Netlify Functions Deployment

For simpler deployments, you can use Netlify Functions to serve your backend:

1. Configure the `netlify.toml` file:
   ```toml
   [functions]
     directory = "backend/src"
     node_bundler = "esbuild"
   ```

2. Create a wrapper function in `.netlify/functions/api.js` to proxy requests to your Express app.

3. Update API endpoints in the frontend to use the Netlify Functions URL:
   ```
   REACT_APP_API_URL=/.netlify/functions/api
   ```

## Database Setup

### MongoDB Atlas Configuration

1. Create a MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. Create a new cluster:
   - Select your preferred cloud provider and region
   - Choose the free tier option for development

3. Set up database access:
   - Create a database user with password authentication
   - Add your IP address to the IP whitelist or allow access from anywhere (0.0.0.0/0) for production

4. Get your connection string:
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string and replace `<password>` with your database user's password

5. Use this connection string as your `MONGODB_URI` environment variable.

## Environment Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```
NODE_ENV=production
PORT=5000
HOST=0.0.0.0

# MongoDB
MONGODB_URI=mongodb+srv://username:password@your-cluster.mongodb.net/recovery-office
MONGODB_NAME=recovery-office

# JWT
JWT_SECRET=your-secure-jwt-secret
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIRES_IN=7

# Redis (optional)
REDIS_ENABLED=false
```

### Frontend Environment Variables

Create a `.env` file in the root directory with:

```
REACT_APP_API_URL=https://your-backend-service.com/api
SKIP_TYPESCRIPT_CHECK=true
TSC_COMPILE_ON_ERROR=true
DISABLE_ESLINT_PLUGIN=true
```

## Netlify Functions

If you're using Netlify Functions for your backend:

1. Install the required dependencies:
   ```bash
   npm install --save-dev @netlify/functions serverless-http
   ```

2. Create a wrapper function in `.netlify/functions/api.js`:
   ```javascript
   const serverless = require('serverless-http');
   const app = require('../../backend/src/server');

   // Wrapper to redirect requests to Express app
   module.exports.handler = serverless(app);
   ```

3. Configure `netlify.toml` to handle function routing:
   ```toml
   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/api/:splat"
     status = 200
   ```

## Testing the Deployment

After deployment, verify the following:

1. Check that all frontend pages load correctly
2. Verify all API endpoints are working
3. Test authentication and protected routes
4. Confirm database operations (CRUD) are working
5. Test form submissions and API integrations
6. Verify responsive design on different devices
7. Run Lighthouse tests for performance, accessibility, SEO, and best practices

## Troubleshooting

### MongoDB Connection Issues

If you encounter MongoDB connection issues:

1. Verify your connection string in the environment variables
2. Check network access permissions in MongoDB Atlas
3. Ensure your database user has the correct permissions
4. Check for firewall restrictions on your hosting service

### Path Alias Issues

If you encounter errors with `@utils` or other path alias imports:

```bash
npm run deploy
```

or 

```bash
npm run deploy:netlify
```

### CORS Issues

If you're experiencing CORS issues between frontend and backend:

1. Ensure your backend CORS settings include your frontend domain:
   ```javascript
   // In backend/src/server.js
   app.use(cors({
     origin: process.env.FRONTEND_URL || 'https://your-frontend-domain.com',
     credentials: true
   }));
   ```

2. Update the environment variable:
   ```
   FRONTEND_URL=https://your-frontend-domain.com
   ```

### Environment Variables

Make sure the following environment variables are set for frontend deployment:

- `SKIP_TYPESCRIPT_CHECK=true`
- `TSC_COMPILE_ON_ERROR=true`
- `CI=false`
- `DISABLE_ESLINT_PLUGIN=true`

These are already configured in the deployment scripts and `netlify.toml`.

### Server Logging

Enable detailed logging to troubleshoot backend issues:

```
LOG_LEVEL=debug
```

## Continuous Integration/Deployment

For automated CI/CD:

1. Configure GitHub Actions or your preferred CI service
2. Set up automated testing before deployment
3. Configure deployment to staging environments for testing
4. Set up automated production deployments after successful tests

## Security Considerations

1. Ensure JWT secrets are secure and not committed to version control
2. Use HTTPS for all communications
3. Implement rate limiting on authentication endpoints
4. Configure proper Content Security Policy headers
5. Keep all dependencies updated to patch security vulnerabilities 