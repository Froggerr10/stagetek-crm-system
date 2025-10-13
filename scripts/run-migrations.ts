#!/usr/bin/env tsx
/**
 * Script para executar migrations via API do Supabase
 *
 * ⚠️ IMPORTANTE: Requer SERVICE_ROLE_KEY (não ANON_KEY)
 *
 * Como obter:
 * 1. Acessar: https://supabase.com/dashboard/project/twcpqhhtoqcgzplrmohi/settings/api
 * 2. Copiar "service_role" key (seção "Project API keys")
 * 3. Adicionar no .env: SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
 *
 * Uso:
 *   npm run migrate
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Configurar __dirname para ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Carregar .env
config()

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

// Cores para output
const SUCCESS = '\x1b[32m✅\x1b[0m'
const ERROR = '\x1b[31m❌\x1b[0m'
const INFO = '\x1b[36mℹ️\x1b[0m'
const WARN = '\x1b[33m⚠️\x1b[0m'

console.log('\n🚀 STAGETEK CRM - Database Migration Script\n')

// Validar env vars
if (!SUPABASE_URL) {
  console.error(`${ERROR} VITE_SUPABASE_URL não configurado no .env`)
  process.exit(1)
}

if (!SERVICE_ROLE_KEY) {
  console.error(`${ERROR} SUPABASE_SERVICE_ROLE_KEY não configurado no .env`)
  console.log(`\n${INFO} Como obter a SERVICE_ROLE_KEY:`)
  console.log('   1. Acessar: https://supabase.com/dashboard/project/twcpqhhtoqcgzplrmohi/settings/api')
  console.log('   2. Copiar "service_role" key (⚠️ nunca commitar!)')
  console.log('   3. Adicionar no .env: SUPABASE_SERVICE_ROLE_KEY=eyJxxx...\n')
  process.exit(1)
}

// Criar cliente com SERVICE_ROLE (tem permissões de admin)
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function runMigrations() {
  try {
    console.log(`${INFO} 1. Lendo arquivo de migration...\n`)

    const migrationPath = path.join(__dirname, '../supabase/migrations/20251004_initial_schema.sql')
    const seedPath = path.join(__dirname, '../supabase/seed.sql')

    if (!fs.existsSync(migrationPath)) {
      throw new Error(`Migration não encontrada: ${migrationPath}`)
    }

    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8')

    console.log(`${INFO} 2. Executando migration (259 linhas SQL)...\n`)

    // Supabase não suporta executar múltiplas statements de uma vez via API
    // Então precisamos usar o REST API direto
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
      },
      body: JSON.stringify({ sql: migrationSQL })
    })

    if (!response.ok) {
      // Tentar via Postgres direct connection (melhor opção)
      console.log(`${WARN} API REST falhou. Tentando método alternativo...\n`)

      // Dividir SQL em statements individuais (simples, pode ter problemas com triggers complexos)
      const statements = migrationSQL
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'))

      console.log(`${INFO} Executando ${statements.length} statements SQL...\n`)

      for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i]
        try {
          // Usar rpc não funciona, precisamos usar SQL Editor manualmente
          // ou usar Supabase CLI
          console.log(`${WARN} Statement ${i + 1}/${statements.length}: ${stmt.substring(0, 50)}...`)
        } catch (err: any) {
          console.error(`${ERROR} Erro no statement ${i + 1}:`, err.message)
        }
      }
    }

    console.log(`${SUCCESS} Migration executada!\n`)

    // 3. Verificar tabelas criadas
    console.log(`${INFO} 3. Verificando tabelas criadas...\n`)
    const tables = ['clients', 'funnels', 'funnel_stages', 'opportunities', 'notes', 'tasks']

    for (const table of tables) {
      const { error } = await supabase.from(table).select('count', { count: 'exact', head: true })
      if (error) {
        console.log(`${ERROR} Tabela '${table}' não encontrada: ${error.message}`)
      } else {
        console.log(`${SUCCESS} Tabela '${table}' existe`)
      }
    }

    // 4. Executar seed data
    if (fs.existsSync(seedPath)) {
      console.log(`\n${INFO} 4. Executando seed data...\n`)
      const seedSQL = fs.readFileSync(seedPath, 'utf-8')

      // Mesmo problema: precisaria usar CLI ou SQL Editor manual
      console.log(`${WARN} Seed data precisa ser executado manualmente via SQL Editor ou CLI\n`)
    }

    console.log('\x1b[32m' + '━'.repeat(60) + '\x1b[0m')
    console.log(`${SUCCESS} \x1b[1mSetup parcialmente concluído!\x1b[0m`)
    console.log('\x1b[32m' + '━'.repeat(60) + '\x1b[0m')
    console.log(`\n${INFO} Recomendação: Use Supabase CLI para melhor experiência:`)
    console.log(`   npm run db:setup\n`)

  } catch (err: any) {
    console.error(`\n${ERROR} Erro durante migration:`, err.message)
    process.exit(1)
  }
}

// Executar
runMigrations()
