@echo off
REM Script para setup do banco via Supabase CLI (Windows)
REM Requer: npm install -g supabase

echo 🚀 STAGETEK CRM - Database Setup via Supabase CLI
echo.

REM 1. Login no Supabase
echo 📝 1. Fazendo login no Supabase...
call npx supabase login

REM 2. Link ao projeto remoto
echo 🔗 2. Conectando ao projeto remoto...
call npx supabase link --project-ref twcpqhhtoqcgzplrmohi

REM 3. Aplicar migrations
echo 📊 3. Executando migrations...
call npx supabase db push

REM 4. Executar seed
echo 🌱 4. Executando seed data...
call npx supabase db execute --file supabase/seed.sql

echo.
echo ✅ Setup concluído! Execute npm run test:supabase para validar.
pause
