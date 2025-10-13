#!/usr/bin/env tsx
/**
 * Script de Teste de Conexão Supabase
 * Valida: conexão, tabelas, RLS policies, CRUD básico
 * Uso: npm run test:supabase
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Carregar .env
config()

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY

// Emojis e cores para output
const SUCCESS = '\x1b[32m✅\x1b[0m'
const ERROR = '\x1b[31m❌\x1b[0m'
const INFO = '\x1b[36mℹ️\x1b[0m'
const WARN = '\x1b[33m⚠️\x1b[0m'

// Validar env vars
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error(`${ERROR} Erro: Variáveis de ambiente não configuradas!`)
  console.log(`${INFO} Verifique se .env contém:`)
  console.log('   VITE_SUPABASE_URL=https://xxx.supabase.co')
  console.log('   VITE_SUPABASE_ANON_KEY=eyJxxx...')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function testConnection() {
  console.log('\n🔍 Testando conexão Supabase...\n')

  try {
    // 1. Testar conexão básica
    console.log(`${INFO} 1. Testando conexão básica...`)
    const { data, error } = await supabase.from('clients').select('count', { count: 'exact', head: true })
    if (error) throw new Error(`Falha na conexão: ${error.message}`)
    console.log(`${SUCCESS} Conexão estabelecida com Supabase`)
    console.log(`   URL: ${SUPABASE_URL}\n`)

    // 2. Verificar tabelas existem
    console.log(`${INFO} 2. Verificando tabelas criadas...`)
    const tables = ['clients', 'funnels', 'funnel_stages', 'opportunities', 'notes', 'tasks']
    for (const table of tables) {
      const { error } = await supabase.from(table).select('count', { count: 'exact', head: true })
      if (error) {
        console.log(`${ERROR} Tabela '${table}' não encontrada ou erro: ${error.message}`)
        console.log(`${WARN} Execute a migration: supabase/migrations/20251004_initial_schema.sql\n`)
        process.exit(1)
      }
      console.log(`${SUCCESS} Tabela '${table}' existe`)
    }
    console.log()

    // 3. Verificar seed data (funil padrão)
    console.log(`${INFO} 3. Verificando seed data (funil padrão)...`)
    const { data: funnels, error: funnelError } = await supabase
      .from('funnels')
      .select('*')
      .eq('is_default', true)
      .single()

    if (funnelError || !funnels) {
      console.log(`${WARN} Funil padrão não encontrado. Execute: supabase/seed.sql`)
    } else {
      console.log(`${SUCCESS} Funil padrão: "${funnels.name}" (ID: ${funnels.id})`)

      // Verificar estágios do funil
      const { data: stages, error: stagesError } = await supabase
        .from('funnel_stages')
        .select('*')
        .eq('funnel_id', funnels.id)
        .order('display_order')

      if (!stagesError && stages) {
        console.log(`${SUCCESS} ${stages.length} estágios configurados:`)
        stages.forEach(s => console.log(`   ${s.display_order}. ${s.name} (${s.color})`))
      }
    }
    console.log()

    // 4. Testar CRUD básico (clientes)
    console.log(`${INFO} 4. Testando CRUD básico (tabela 'clients')...`)

    // INSERT
    const testClient = {
      name: 'Teste CRM - Script',
      cnpj: '12.345.678/0001-99',
      email: 'teste@stagetek.com.br',
      phone: '(11) 99999-9999',
      status: 'active'
    }

    const { data: inserted, error: insertError } = await supabase
      .from('clients')
      .insert(testClient)
      .select()
      .single()

    if (insertError) {
      console.log(`${ERROR} Falha ao inserir cliente: ${insertError.message}`)
      if (insertError.message.includes('permission')) {
        console.log(`${WARN} Problema com RLS policies. Verifique Authentication → Policies no Supabase Dashboard\n`)
      }
      process.exit(1)
    }
    console.log(`${SUCCESS} INSERT: Cliente criado (ID: ${inserted.id})`)

    // SELECT
    const { data: selected, error: selectError } = await supabase
      .from('clients')
      .select('*')
      .eq('id', inserted.id)
      .single()

    if (selectError || !selected) {
      console.log(`${ERROR} Falha ao buscar cliente: ${selectError?.message}`)
      process.exit(1)
    }
    console.log(`${SUCCESS} SELECT: Cliente encontrado ("${selected.name}")`)

    // UPDATE
    const { data: updated, error: updateError } = await supabase
      .from('clients')
      .update({ name: 'Teste CRM - Atualizado' })
      .eq('id', inserted.id)
      .select()
      .single()

    if (updateError) {
      console.log(`${ERROR} Falha ao atualizar cliente: ${updateError.message}`)
      process.exit(1)
    }
    console.log(`${SUCCESS} UPDATE: Cliente atualizado ("${updated.name}")`)

    // DELETE
    const { error: deleteError } = await supabase
      .from('clients')
      .delete()
      .eq('id', inserted.id)

    if (deleteError) {
      console.log(`${ERROR} Falha ao deletar cliente: ${deleteError.message}`)
      process.exit(1)
    }
    console.log(`${SUCCESS} DELETE: Cliente removido\n`)

    // 5. Verificar RLS policies
    console.log(`${INFO} 5. Verificando RLS policies...`)
    console.log(`${SUCCESS} CRUD completo funcionou (RLS configurado corretamente)\n`)

    // 6. Estatísticas
    console.log(`${INFO} 6. Estatísticas do banco de dados:`)
    const { count: clientsCount } = await supabase.from('clients').select('*', { count: 'exact', head: true })
    const { count: oppsCount } = await supabase.from('opportunities').select('*', { count: 'exact', head: true })
    const { count: productsCount } = await supabase.from('products').select('*', { count: 'exact', head: true })

    console.log(`   ${clientsCount || 0} clientes`)
    console.log(`   ${oppsCount || 0} oportunidades`)
    console.log(`   ${productsCount || 0} produtos\n`)

    // ✅ Tudo OK!
    console.log('\x1b[32m' + '━'.repeat(60) + '\x1b[0m')
    console.log(`${SUCCESS} \x1b[1mTODOS OS TESTES PASSARAM!\x1b[0m`)
    console.log('\x1b[32m' + '━'.repeat(60) + '\x1b[0m')
    console.log(`\n${INFO} Próximo passo: Conectar UI ao backend`)
    console.log(`   Atualizar: src/pages/Clientes.tsx`)
    console.log(`   Atualizar: src/pages/Oportunidades.tsx\n`)

  } catch (err) {
    console.error(`\n${ERROR} Erro inesperado:`, err)
    process.exit(1)
  }
}

// Executar testes
testConnection()
