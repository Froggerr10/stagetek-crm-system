# STAGETEK CRM - Deploy Simplificado
# Usage: .\scripts\deploy-simple.ps1

Write-Host ""
Write-Host "======================================"
Write-Host "STAGETEK CRM - Deploy"
Write-Host "======================================"
Write-Host ""

# Step 1: Check Vercel CLI
Write-Host "[1/5] Verificando Vercel CLI..." -ForegroundColor Yellow
try {
    $null = vercel --version
    Write-Host "OK - Vercel CLI encontrado" -ForegroundColor Green
} catch {
    Write-Host "ERRO - Vercel CLI nao encontrado" -ForegroundColor Red
    Write-Host "Instalando Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Step 2: Check login
Write-Host ""
Write-Host "[2/5] Verificando login..." -ForegroundColor Yellow
try {
    $user = vercel whoami 2>$null
    Write-Host "OK - Logado como: $user" -ForegroundColor Green
} catch {
    Write-Host "ERRO - Nao logado" -ForegroundColor Red
    Write-Host "Executando login..." -ForegroundColor Yellow
    vercel login
}

# Step 3: Build
Write-Host ""
Write-Host "[3/5] Executando build..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "OK - Build completo" -ForegroundColor Green
} else {
    Write-Host "ERRO - Build falhou" -ForegroundColor Red
    exit 1
}

# Step 4: Deploy
Write-Host ""
Write-Host "[4/5] Fazendo deploy staging..." -ForegroundColor Yellow
vercel

# Step 5: Instructions
Write-Host ""
Write-Host "======================================"
Write-Host "Deploy concluido!" -ForegroundColor Green
Write-Host "======================================"
Write-Host ""
Write-Host "PROXIMO PASSO:" -ForegroundColor Yellow
Write-Host "1. Abrir: https://vercel.com"
Write-Host "2. Clicar no projeto 'stagetek-crm'"
Write-Host "3. Settings -> Environment Variables"
Write-Host "4. Adicionar:"
Write-Host "   VITE_SUPABASE_URL"
Write-Host "   VITE_SUPABASE_ANON_KEY"
Write-Host "5. Executar: vercel --prod"
Write-Host ""
