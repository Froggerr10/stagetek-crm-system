#!/bin/bash

# =====================================================
# STAGETEK CRM - Deploy Script
# Automated deployment to Vercel
# Usage: ./scripts/deploy.sh [staging|production]
# =====================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
print_success() { echo -e "${GREEN}✓${NC} $1"; }
print_error() { echo -e "${RED}✗${NC} $1"; }
print_info() { echo -e "${YELLOW}→${NC} $1"; }

# Check arguments
ENVIRONMENT=${1:-staging}

echo ""
echo "======================================"
echo "STAGETEK CRM - Deploy Script"
echo "======================================"
echo ""

# Step 1: Check if Vercel CLI is installed
print_info "Checking Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI not found. Installing..."
    npm install -g vercel
    print_success "Vercel CLI installed"
else
    print_success "Vercel CLI found"
fi

# Step 2: Check if logged in
print_info "Checking Vercel login..."
if ! vercel whoami &> /dev/null; then
    print_error "Not logged in to Vercel"
    print_info "Running: vercel login"
    vercel login
else
    VERCEL_USER=$(vercel whoami)
    print_success "Logged in as: $VERCEL_USER"
fi

# Step 3: Check .env file
print_info "Checking .env file..."
if [ ! -f ".env" ]; then
    print_error ".env file not found!"
    print_info "Create .env file with:"
    print_info "  VITE_SUPABASE_URL=https://your-project.supabase.co"
    print_info "  VITE_SUPABASE_ANON_KEY=your-key-here"
    exit 1
else
    print_success ".env file exists"
fi

# Step 4: Run type check (optional, don't fail on errors)
print_info "Running type check..."
npm run type-check || print_error "Type check has errors (continuing anyway...)"

# Step 5: Run build
print_info "Building production bundle..."
npm run build
if [ $? -eq 0 ]; then
    print_success "Build successful"
else
    print_error "Build failed!"
    exit 1
fi

# Step 6: Check dist folder
if [ ! -d "dist" ]; then
    print_error "dist/ folder not found after build!"
    exit 1
fi
print_success "dist/ folder created"

# Step 7: Deploy
echo ""
echo "======================================"
print_info "Deploying to: $ENVIRONMENT"
echo "======================================"
echo ""

if [ "$ENVIRONMENT" = "production" ]; then
    print_info "Deploying to PRODUCTION..."
    vercel --prod
    if [ $? -eq 0 ]; then
        print_success "Production deployment successful!"
    else
        print_error "Production deployment failed!"
        exit 1
    fi
else
    print_info "Deploying to STAGING..."
    vercel
    if [ $? -eq 0 ]; then
        print_success "Staging deployment successful!"
    else
        print_error "Staging deployment failed!"
        exit 1
    fi
fi

echo ""
echo "======================================"
print_success "Deployment complete!"
echo "======================================"
echo ""
print_info "Next steps:"
print_info "1. Open the deployment URL in your browser"
print_info "2. Test login and basic functionality"
print_info "3. If staging OK, deploy to production:"
print_info "   ./scripts/deploy.sh production"
echo ""
