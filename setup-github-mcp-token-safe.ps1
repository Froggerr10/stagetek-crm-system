# Configurar GITHUB_TOKEN para Claude Desktop MCP (VERSÃO SEGURA)
# Data: 30 Outubro 2025

Write-Host "Configurando GITHUB_TOKEN para Claude Desktop..." -ForegroundColor Cyan
Write-Host ""

# Solicitar token do usuário (não fica hardcoded no arquivo)
$token = Read-Host "Cole seu GitHub Personal Access Token (ghp_...)" -AsSecureString
$tokenPlainText = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token)
)

# Validar formato
if ($tokenPlainText -notmatch '^ghp_[a-zA-Z0-9]{36}$') {
    Write-Host "ERRO: Token invalido! Deve comecar com 'ghp_' e ter 40 caracteres." -ForegroundColor Red
    exit 1
}

# Configurar variavel de ambiente GITHUB_TOKEN (nivel User)
[System.Environment]::SetEnvironmentVariable('GITHUB_TOKEN', $tokenPlainText, 'User')

Write-Host ""
Write-Host "GITHUB_TOKEN configurado com sucesso!" -ForegroundColor Green

# Verificar se foi configurado corretamente
$verificacao = [System.Environment]::GetEnvironmentVariable('GITHUB_TOKEN', 'User')

if ($verificacao -eq $tokenPlainText) {
    Write-Host "Verificacao OK: Token configurado corretamente" -ForegroundColor Green
    Write-Host "Token: $($verificacao.Substring(0, 10))..." -ForegroundColor Gray
}

# Limpar variáveis sensíveis da memória
$token = $null
$tokenPlainText = $null

# Instrucoes finais
Write-Host ""
Write-Host "PROXIMOS PASSOS:" -ForegroundColor Cyan
Write-Host "1. Variavel GITHUB_TOKEN configurada" -ForegroundColor Green
Write-Host "2. FECHE E REABRA o Claude Desktop (CRITICO!)" -ForegroundColor Yellow
Write-Host "3. Teste o MCP: Liste meus repositorios GitHub" -ForegroundColor Cyan
Write-Host ""
Write-Host "Configuracao concluida! Reinicie o Claude Desktop agora." -ForegroundColor Green
