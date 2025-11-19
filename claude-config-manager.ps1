# Claude Desktop Config Manager
# Gerencia perfis de MCPs para evitar consumo desnecessario

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("minimal", "full", "status")]
    [string]$Profile = "status"
)

$ConfigPath = "$env:APPDATA\Claude\claude_desktop_config.json"
$BackupPath = "$env:APPDATA\Claude\claude_desktop_config.FULL_BACKUP.json"

function Show-Status {
    Write-Host "`n=== CLAUDE MCP CONFIG STATUS ===" -ForegroundColor Cyan

    if (Test-Path $ConfigPath) {
        $config = Get-Content $ConfigPath | ConvertFrom-Json
        $mcpCount = $config.mcpServers.PSObject.Properties.Count

        Write-Host "`nMCPs Ativos: $mcpCount" -ForegroundColor Yellow
        Write-Host "Config atual: $ConfigPath" -ForegroundColor Gray

        Write-Host "`nMCPs instalados:" -ForegroundColor White
        $config.mcpServers.PSObject.Properties | ForEach-Object {
            $name = $_.Name
            $hasKey = $_.Value.args -match "cf01366f"
            if ($hasKey) {
                Write-Host "  [PAGO] $name (Smithery)" -ForegroundColor Red
            } else {
                Write-Host "  [GRATIS] $name" -ForegroundColor Green
            }
        }
    }

    Write-Host "`n================================`n" -ForegroundColor Cyan
}

function Switch-ToMinimal {
    Write-Host "`n[ATENCAO] Mudando para perfil MINIMAL (Economia)...`n" -ForegroundColor Yellow

    # Backup do config atual
    if (Test-Path $ConfigPath) {
        Copy-Item $ConfigPath $BackupPath -Force
        Write-Host "[OK] Backup salvo em: $BackupPath`n" -ForegroundColor Green
    }

    # Config minimal (apenas MCPs gratuitos essenciais)
    $minimalConfig = @{
        mcpServers = @{
            filesystem = @{
                command = "npx"
                args = @("-y", "@modelcontextprotocol/server-filesystem", $env:USERPROFILE)
            }
            github = @{
                command = "npx"
                args = @("-y", "@modelcontextprotocol/server-github")
                env = @{
                    GITHUB_PERSONAL_ACCESS_TOKEN = "GITHUB_TOKEN"
                }
            }
            memory = @{
                command = "npx"
                args = @("-y", "@modelcontextprotocol/server-memory")
            }
            "shadcn-ui" = @{
                command = "npx"
                args = @("@jpisnice/shadcn-ui-mcp-server")
                env = @{
                    GITHUB_PERSONAL_ACCESS_TOKEN = "GITHUB_TOKEN"
                }
            }
            supabase = @{
                command = "npx"
                args = @("-y", "@supabase/mcp-server-supabase@latest", "--access-token", "sbp_cabd91394e7e84c6fa11ce60364e6e5fd4d40485", "--project-ref", "twcpqhhtoqcgzplrmohi")
            }
        }
        ui = @{
            showMcpStatus = $true
            showMcpIcons = $true
        }
    }

    $minimalConfig | ConvertTo-Json -Depth 10 | Out-File $ConfigPath -Encoding ASCII -Force
    Write-Host "[OK] Perfil MINIMAL ativado (5 MCPs gratuitos)`n" -ForegroundColor Green
    Write-Host "[INFO] Reinicie o Claude Desktop para aplicar`n" -ForegroundColor Cyan
}

function Switch-ToFull {
    Write-Host "`n[ATENCAO] Mudando para perfil FULL (Todos os MCPs)...`n" -ForegroundColor Yellow

    if (Test-Path $BackupPath) {
        Copy-Item $BackupPath $ConfigPath -Force
        Write-Host "[OK] Perfil FULL restaurado (19 MCPs)`n" -ForegroundColor Green
        Write-Host "[AVISO] MCPs pagos serao inicializados!`n" -ForegroundColor Red
        Write-Host "[INFO] Reinicie o Claude Desktop para aplicar`n" -ForegroundColor Cyan
    } else {
        Write-Host "[ERRO] Backup nao encontrado! Execute primeiro: -Profile minimal`n" -ForegroundColor Red
    }
}

# Main
switch ($Profile) {
    "minimal" { Switch-ToMinimal }
    "full" { Switch-ToFull }
    "status" { Show-Status }
}
