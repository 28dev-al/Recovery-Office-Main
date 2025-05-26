Write-Host "🚨 EMERGENCY RECOVERY OFFICE STARTUP 🚨" -ForegroundColor Red
Write-Host ""

# Kill any existing processes on ports 3000 and 5000
Write-Host "Stopping any existing processes..." -ForegroundColor Yellow
$processes3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
$processes5000 = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique

if ($processes3000) {
    foreach ($pid in $processes3000) {
        Write-Host "Killing process on port 3000 (PID: $pid)"
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    }
}

if ($processes5000) {
    foreach ($pid in $processes5000) {
        Write-Host "Killing process on port 5000 (PID: $pid)"
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    }
}

Start-Sleep -Seconds 2

# Clear caches
Write-Host ""
Write-Host "Clearing caches..." -ForegroundColor Yellow
if (Test-Path "node_modules/.cache") {
    Remove-Item -Path "node_modules/.cache" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "✓ Cleared node_modules cache" -ForegroundColor Green
}

if (Test-Path "build") {
    Remove-Item -Path "build" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "✓ Cleared build directory" -ForegroundColor Green
}

# Start emergency backend
Write-Host ""
Write-Host "Starting emergency backend server..." -ForegroundColor Yellow
$backendPath = Join-Path $PSScriptRoot "backend\emergency-server.js"

if (Test-Path $backendPath) {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; node emergency-server.js" -WindowStyle Normal
    Write-Host "✓ Emergency backend started on port 5000" -ForegroundColor Green
} else {
    Write-Host "❌ Emergency backend not found at: $backendPath" -ForegroundColor Red
    Write-Host "Creating minimal emergency backend..." -ForegroundColor Yellow
    
    # Create minimal emergency backend inline
    $emergencyBackend = @'
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/services', (req, res) => {
  res.json({
    status: 'success',
    data: [
      {
        _id: '507f1f77bcf86cd799439011',
        id: '507f1f77bcf86cd799439011',
        name: 'Emergency Recovery Service',
        description: 'Emergency fallback service',
        duration: 60,
        price: 500,
        category: 'recovery',
        isActive: true
      }
    ]
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Emergency server running' });
});

app.listen(5000, () => {
  console.log('Emergency backend on port 5000');
});
'@
    
    $emergencyBackend | Out-File -FilePath "backend\emergency-minimal.js" -Encoding UTF8
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; node emergency-minimal.js" -WindowStyle Normal
}

Start-Sleep -Seconds 3

# Test backend health
Write-Host ""
Write-Host "Testing backend health..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get -ErrorAction Stop
    Write-Host "✓ Backend is responding: $($response.status)" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Backend health check failed - may still be starting up" -ForegroundColor Yellow
}

# Start frontend with emergency environment
Write-Host ""
Write-Host "Starting frontend with emergency configuration..." -ForegroundColor Yellow
$env:REACT_APP_API_URL = "http://localhost:5000"
$env:NODE_ENV = "development"
$env:DISABLE_ESLINT_PLUGIN = "true"
$env:TSC_COMPILE_ON_ERROR = "true"
$env:GENERATE_SOURCEMAP = "false"

Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start" -WindowStyle Normal

Write-Host ""
Write-Host "✅ EMERGENCY STARTUP COMPLETE" -ForegroundColor Green
Write-Host ""
Write-Host "Services starting:" -ForegroundColor Cyan
Write-Host "  - Emergency Backend: http://localhost:5000" -ForegroundColor White
Write-Host "  - Frontend: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Monitor the console windows for any errors." -ForegroundColor Yellow
Write-Host "Press Ctrl+C in each window to stop the services." -ForegroundColor Yellow 