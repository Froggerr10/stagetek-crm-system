# ============================================
# Script de Configuração de MCPs
# Claude Desktop - Variáveis de Ambiente
# ============================================

Write-Host "`n🔧 CONFIGURADOR DE TOKENS - MCPS DO CLAUDE DESKTOP`n" -ForegroundColor Cyan

# Verificar se está rodando como Administrador
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "⚠️  AVISO: Rodando sem privilégios de Administrador" -ForegroundColor Yellow
    Write-Host "   Recomendado: Clique com botão direito > 'Executar como Administrador'`n" -ForegroundColor Yellow
}

# ============================================
# TOKEN 1: GITHUB (ESSENCIAL)
# ============================================
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "1️⃣  GITHUB TOKEN (ESSENCIAL)" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""
Write-Host "📝 Onde gerar:" -ForegroundColor Yellow
Write-Host "   https://github.com/settings/tokens?type=beta`n" -ForegroundColor White

$githubToken = Read-Host "Cole o GITHUB_TOKEN (ghp_...) ou deixe vazio para pular"

if ($githubToken -and $githubToken.Length -gt 0) {
    [System.Environment]::SetEnvironmentVariable('GITHUB_TOKEN', $githubToken, 'User')
    Write-Host "✅ GITHUB_TOKEN configurado com sucesso!`n" -ForegroundColor Green
} else {
    Write-Host "⏭️  GITHUB_TOKEN pulado`n" -ForegroundColor Yellow
}

# ============================================
# TOKEN 2: NOTION (OPCIONAL)
# ============================================
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "2️⃣  NOTION TOKEN (Opcional)" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""
Write-Host "📝 Onde gerar:" -ForegroundColor Yellow
Write-Host "   https://www.notion.so/my-integrations`n" -ForegroundColor White

$notionToken = Read-Host "Cole o NOTION_TOKEN (secret_...) ou deixe vazio para pular"

if ($notionToken -and $notionToken.Length -gt 0) {
    [System.Environment]::SetEnvironmentVariable('NOTION_TOKEN', $notionToken, 'User')
    Write-Host "✅ NOTION_TOKEN configurado com sucesso!`n" -ForegroundColor Green
} else {
    Write-Host "⏭️  NOTION_TOKEN pulado`n" -ForegroundColor Yellow
}

# ============================================
# TOKEN 3: APIFY (OPCIONAL)
# ============================================
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "3️⃣  APIFY TOKEN (Opcional)" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""
Write-Host "📝 Onde gerar:" -ForegroundColor Yellow
Write-Host "   https://console.apify.com/account/integrations`n" -ForegroundColor White

$apifyToken = Read-Host "Cole o APIFY_TOKEN (apify_api_...) ou deixe vazio para pular"

if ($apifyToken -and $apifyToken.Length -gt 0) {
    [System.Environment]::SetEnvironmentVariable('APIFY_TOKEN', $apifyToken, 'User')
    Write-Host "✅ APIFY_TOKEN configurado com sucesso!`n" -ForegroundColor Green
} else {
    Write-Host "⏭️  APIFY_TOKEN pulado`n" -ForegroundColor Yellow
}

# ============================================
# VERIFICAÇÃO
# ============================================
Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "📊 VERIFICAÇÃO DE TOKENS" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

$tokensConfigurados = 0

# Verificar GITHUB_TOKEN
$githubEnv = [System.Environment]::GetEnvironmentVariable('GITHUB_TOKEN', 'User')
if ($githubEnv) {
    Write-Host "✅ GITHUB_TOKEN: Configurado (***${githubEnv.Substring([Math]::Max(0, $githubEnv.Length - 10))})" -ForegroundColor Green
    $tokensConfigurados++
} else {
    Write-Host "❌ GITHUB_TOKEN: Não configurado" -ForegroundColor Red
}

# Verificar NOTION_TOKEN
$notionEnv = [System.Environment]::GetEnvironmentVariable('NOTION_TOKEN', 'User')
if ($notionEnv) {
    Write-Host "✅ NOTION_TOKEN: Configurado (***${notionEnv.Substring([Math]::Max(0, $notionEnv.Length - 10))})" -ForegroundColor Green
    $tokensConfigurados++
} else {
    Write-Host "⚠️  NOTION_TOKEN: Não configurado (opcional)" -ForegroundColor Yellow
}

# Verificar APIFY_TOKEN
$apifyEnv = [System.Environment]::GetEnvironmentVariable('APIFY_TOKEN', 'User')
if ($apifyEnv) {
    Write-Host "✅ APIFY_TOKEN: Configurado (***${apifyEnv.Substring([Math]::Max(0, $apifyEnv.Length - 10))})" -ForegroundColor Green
    $tokensConfigurados++
} else {
    Write-Host "⚠️  APIFY_TOKEN: Não configurado (opcional)" -ForegroundColor Yellow
}

# ============================================
# RESULTADO FINAL
# ============================================
Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "🎉 CONFIGURAÇÃO CONCLUÍDA!" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""
Write-Host "📊 Total de tokens configurados: $tokensConfigurados" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  IMPORTANTE:" -ForegroundColor Yellow
Write-Host "   1. FECHE COMPLETAMENTE o Claude Desktop" -ForegroundColor White
Write-Host "   2. REABRA o Claude Desktop" -ForegroundColor White
Write-Host "   3. Aguarde alguns segundos para os MCPs inicializarem" -ForegroundColor White
Write-Host ""
Write-Host "🧪 Para testar:" -ForegroundColor Cyan
Write-Host "   • GitHub: 'Liste meus repositórios GitHub'" -ForegroundColor White
Write-Host "   • Supabase: 'Quais são as tabelas no meu banco?'" -ForegroundColor White
Write-Host "   • Brasil API: 'Consulte o CEP 01310-100'" -ForegroundColor White
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Gray

# Perguntar se quer abrir o guia completo
$abrirGuia = Read-Host "Deseja abrir o guia completo? (S/N)"
if ($abrirGuia -eq 'S' -or $abrirGuia -eq 's') {
    $guiaPath = Join-Path $PSScriptRoot ".ai\CONFIGURAR-MCPS-GUIA-COMPLETO.md"
    if (Test-Path $guiaPath) {
        Start-Process $guiaPath
    } else {
        Write-Host "⚠️  Guia não encontrado: $guiaPath" -ForegroundColor Yellow
    }
}

Write-Host "Pressione qualquer tecla para sair..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
