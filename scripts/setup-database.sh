#!/bin/bash
# Script para setup do banco via Supabase CLI
# Requer: npm install -g supabase

echo "🚀 STAGETEK CRM - Database Setup via Supabase CLI"
echo ""

# 1. Login no Supabase
echo "📝 1. Fazendo login no Supabase..."
npx supabase login

# 2. Link ao projeto remoto
echo "🔗 2. Conectando ao projeto remoto..."
npx supabase link --project-ref twcpqhhtoqcgzplrmohi

# 3. Aplicar migrations
echo "📊 3. Executando migrations..."
npx supabase db push

# 4. Executar seed
echo "🌱 4. Executando seed data..."
npx supabase db execute --file supabase/seed.sql

echo ""
echo "✅ Setup concluído! Execute npm run test:supabase para validar."
