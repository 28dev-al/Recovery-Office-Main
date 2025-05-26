# Recovery Office Server Startup Script for PowerShell
# This script starts both frontend and backend servers properly

Write-Host "🚀 Starting Recovery Office Servers..." -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Function to start backend server
function Start-BackendServer {
    Write-Host "📡 Starting Backend Server..." -ForegroundColor Yellow
    Set-Location "backend"
    Start-Process -FilePath "npm" -ArgumentList "start" -WindowStyle Normal
    Set-Location ".."
    Write-Host "✅ Backend server started on http://localhost:5000" -ForegroundColor Green
}

# Function to start frontend server
function Start-FrontendServer {
    Write-Host "🌐 Starting Frontend Server..." -ForegroundColor Yellow
    Start-Process -FilePath "npm" -ArgumentList "run", "start:dev" -WindowStyle Normal
    Write-Host "✅ Frontend server starting on http://localhost:3000" -ForegroundColor Green
}

# Function to clean and start
function Start-Clean {
    Write-Host "🧹 Cleaning cache..." -ForegroundColor Yellow
    npm run clean
    Write-Host "✅ Cache cleaned" -ForegroundColor Green
    Start-FrontendServer
}

# Main execution
param(
    [string]$Mode = "normal"
)

switch ($Mode) {
    "clean" {
        Start-Clean
    }
    "backend" {
        Start-BackendServer
    }
    "frontend" {
        Start-FrontendServer
    }
    default {
        Start-BackendServer
        Start-Sleep -Seconds 3
        Start-FrontendServer
    }
}

Write-Host "=====================================" -ForegroundColor Green
Write-Host "🎯 Recovery Office servers starting..." -ForegroundColor Green
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Green 