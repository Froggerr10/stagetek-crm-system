# =====================================================
# STAGETEK CRM - Deploy Script (PowerShell)
# Automated deployment to Vercel
# Usage: .\scripts\deploy.ps1 [staging|production]
# =====================================================

param(
    [string]$Environment = "staging"
)

# Colors
$Green = "Green"
$Red = "Red"
$Yellow = "Yellow"

function Print-Success { param([string]$Message) Write-Host "✓ $Message" -ForegroundColor $Green }
function Print-Error { param([string]$Message) Write-Host "✗ $Message" -ForegroundColor $Red }
function Print-Info { param([string]$Message) Write-Host "→ $Message" -ForegroundColor $Yellow }

Write-Host ""
Write-Host "======================================"
Write-Host "STAGETEK CRM - Deploy Script"
Write-Host "======================================"
Write-Host ""

# Step 1: Check if Vercel CLI is installed
Print-Info "Checking Vercel CLI..."
try {
    $vercelVersion = vercel --version 2>$null
    Print-Success "Vercel CLI found: $vercelVersion"
} catch {
    Print-Error "Vercel CLI not found. Installing..."
    npm install -g vercel
    Print-Success "Vercel CLI installed"
}

# Step 2: Check if logged in
Print-Info "Checking Vercel login..."
try {
    $vercelUser = vercel whoami 2>$null
    Print-Success "Logged in as: $vercelUser"
} catch {
    Print-Error "Not logged in to Vercel"
    Print-Info "Running: vercel login"
    vercel login
}

# Step 3: Check .env file
Print-Info "Checking .env file..."
if (-Not (Test-Path ".env")) {
    Print-Error ".env file not found!"
    Print-Info "Create .env file with:"
    Print-Info "  VITE_SUPABASE_URL=https://your-project.supabase.co"
    Print-Info "  VITE_SUPABASE_ANON_KEY=your-key-here"
    exit 1
} else {
    Print-Success ".env file exists"
}

# Step 4: Run type check (optional)
Print-Info "Running type check..."
try {
    npm run type-check 2>$null
} catch {
    Print-Error "Type check has errors (continuing anyway...)"
}

# Step 5: Run build
Print-Info "Building production bundle..."
npm run build
if ($LASTEXITCODE -eq 0) {
    Print-Success "Build successful"
} else {
    Print-Error "Build failed!"
    exit 1
}

# Step 6: Check dist folder
if (-Not (Test-Path "dist")) {
    Print-Error "dist/ folder not found after build!"
    exit 1
}
Print-Success "dist/ folder created"

# Step 7: Deploy
Write-Host ""
Write-Host "======================================"
Print-Info "Deploying to: $Environment"
Write-Host "======================================"
Write-Host ""

if ($Environment -eq "production") {
    Print-Info "Deploying to PRODUCTION..."
    vercel --prod
    if ($LASTEXITCODE -eq 0) {
        Print-Success "Production deployment successful!"
    } else {
        Print-Error "Production deployment failed!"
        exit 1
    }
} else {
    Print-Info "Deploying to STAGING..."
    vercel
    if ($LASTEXITCODE -eq 0) {
        Print-Success "Staging deployment successful!"
    } else {
        Print-Error "Staging deployment failed!"
        exit 1
    }
}

Write-Host ""
Write-Host "======================================"
Print-Success "Deployment complete!"
Write-Host "======================================"
Write-Host ""
Print-Info "Next steps:"
Print-Info "1. Open the deployment URL in your browser"
Print-Info "2. Test login and basic functionality"
Print-Info "3. If staging OK, deploy to production:"
Print-Info "   .\scripts\deploy.ps1 production"
Write-Host ""
