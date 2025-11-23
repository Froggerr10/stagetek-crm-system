interface CNPJData {
  cnpj: string
  nome: string
  fantasia?: string
  email?: string
  telefone?: string
  logradouro?: string
  numero?: string
  complemento?: string
  bairro?: string
  municipio?: string
  uf?: string
  cep?: string
}

export async function fetchCNPJData(cnpj: string): Promise<CNPJData | null> {
  const cleanCNPJ = cnpj.replace(/\D/g, '')

  if (cleanCNPJ.length !== 14) {
    throw new Error('CNPJ deve ter 14 dígitos')
  }

  try {
    // 1. Buscar primeiro na Brasil API
    const brasilApiResponse = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCNPJ}`)

    if (!brasilApiResponse.ok) {
      // Se Brasil API falhar, usar apenas ReceitaWS
      const fallbackResponse = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cleanCNPJ}`)

      if (!fallbackResponse.ok) {
        throw new Error('CNPJ não encontrado')
      }

      const data = await fallbackResponse.json()

      return {
        cnpj: data.cnpj,
        nome: data.nome,
        fantasia: data.fantasia,
        email: data.email,
        telefone: data.telefone,
        logradouro: data.logradouro,
        numero: data.numero,
        complemento: data.complemento,
        bairro: data.bairro,
        municipio: data.municipio,
        uf: data.uf,
        cep: data.cep
      }
    }

    const brasilData = await brasilApiResponse.json()

    // Montar endereço sem undefined
    const tipoLog = brasilData.descricao_tipo_logradouro || ''
    const logradouro = brasilData.logradouro || ''
    const endereco = tipoLog && logradouro ? `${tipoLog} ${logradouro}` : logradouro

    // Montar resultado da Brasil API
    const result: CNPJData = {
      cnpj: brasilData.cnpj,
      nome: brasilData.nome_fantasia || brasilData.razao_social,
      fantasia: brasilData.nome_fantasia,
      email: brasilData.email || '',
      telefone: brasilData.ddd_telefone_1 || '',
      logradouro: endereco,
      numero: brasilData.numero || '',
      complemento: brasilData.complemento || '',
      bairro: brasilData.bairro || '',
      municipio: brasilData.municipio || '',
      uf: brasilData.uf || '',
      cep: brasilData.cep || ''
    }

    // 2. Se campos críticos estão vazios, buscar da ReceitaWS para completar
    const needsEmailOrPhone = !result.email || !result.telefone

    if (needsEmailOrPhone) {
      try {
        const receitaResponse = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cleanCNPJ}`)

        if (receitaResponse.ok) {
          const receitaData = await receitaResponse.json()

          // Merge: preencher apenas campos vazios com dados da ReceitaWS
          if (!result.email && receitaData.email) {
            result.email = receitaData.email
          }
          if (!result.telefone && receitaData.telefone) {
            result.telefone = receitaData.telefone
          }
        }
      } catch {
        // Se ReceitaWS falhar, continuar com dados da Brasil API
      }
    }

    return result
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Erro ao consultar CNPJ')
  }
}

export function validateCNPJ(cnpj: string): boolean {
  const cleanCNPJ = cnpj.replace(/\D/g, '')

  if (cleanCNPJ.length !== 14) return false

  if (/^(\d)\1+$/.test(cleanCNPJ)) return false

  let length = cleanCNPJ.length - 2
  let numbers = cleanCNPJ.substring(0, length)
  const digits = cleanCNPJ.substring(length)
  let sum = 0
  let pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(0))) return false

  length = length + 1
  numbers = cleanCNPJ.substring(0, length)
  sum = 0
  pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  return result === parseInt(digits.charAt(1))
}

export function formatCNPJ(cnpj: string): string {
  const clean = cnpj.replace(/\D/g, '')
  return clean.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
}
