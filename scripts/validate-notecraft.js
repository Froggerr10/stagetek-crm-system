#!/usr/bin/env node
import fs from 'fs'
import { glob } from 'glob'

const LIMITS = {
  atoms: 20,
  molecules: 35,
  organisms: 50,
  templates: 30,
}

const COLORS = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
}

async function validateFiles() {
  const patterns = [
    'src/components/atoms/**/*.{ts,tsx}',
    'src/components/molecules/**/*.{ts,tsx}',
    'src/components/organisms/**/*.{ts,tsx}',
    'src/components/templates/**/*.{ts,tsx}',
  ]

  let hasErrors = false
  const violations = []

  for (const pattern of patterns) {
    const files = await glob(pattern, { cwd: process.cwd() })

    for (const file of files) {
      const parts = file.split(/[\\/]/)
      const layer = parts[2]
      const limit = LIMITS[layer]
      const content = fs.readFileSync(file, 'utf-8')
      const lines = content.split('\n').length

      if (lines > limit) {
        hasErrors = true
        violations.push({ file, layer, lines, limit, excess: lines - limit })
      }
    }
  }

  console.log('\n🍎 Protocol Notecraft™ Validation\n')

  if (violations.length === 0) {
    console.log(`${COLORS.green}✅ All files comply with Protocol Notecraft™${COLORS.reset}\n`)
    return true
  }

  console.log(`${COLORS.red}❌ Found ${violations.length} violations:${COLORS.reset}\n`)

  violations.forEach(({ file, layer, lines, limit, excess }) => {
    console.log(`${COLORS.red}✗${COLORS.reset} ${file}`)
    console.log(`  ${lines} lines (limit: ${limit}, excess: +${excess})`)
  })

  console.log(`\n${COLORS.yellow}Fix these files before committing!${COLORS.reset}\n`)
  return false
}

validateFiles().then(success => {
  process.exit(success ? 0 : 1)
})
