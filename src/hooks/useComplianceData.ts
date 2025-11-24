import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export interface ComplianceData {
  id?: string
  client_id?: string
  situacao_cadastral?: string
  data_situacao_cadastral?: string
  motivo_situacao_cadastral?: string
  opcao_simples?: boolean
  data_opcao_simples?: string
  data_exclusao_simples?: string
  opcao_mei?: boolean
  porte?: string
  natureza_juridica?: string
  capital_social?: number
  data_inicio_atividade?: string
  cnae_principal?: string
  cnae_principal_descricao?: string
  data_consulta?: string
  api_source?: string
  raw_data?: any
}

interface OpenCNPJResponse {
  cnpj: string
  razao_social: string
  nome_fantasia?: string
  situacao_cadastral: string
  data_situacao_cadastral: string
  motivo_situacao_cadastral?: string
  opcao_simples?: string // "Sim" ou "Não"
  data_opcao_simples?: string
  data_exclusao_simples?: string
  opcao_mei?: string // "Sim" ou "Não"
  porte?: string
  natureza_juridica?: string
  capital_social?: string
  data_inicio_atividade: string
  cnae_principal?: string
  cnae_principal_descricao?: string
}

export function useComplianceData() {
  const [loading, setLoading] = useState(false)

  async function fetchFromOpenCNPJ(cnpj: string): Promise<ComplianceData | null> {
    const cleanCNPJ = cnpj.replace(/\D/g, '')

    if (cleanCNPJ.length !== 14) {
      throw new Error('CNPJ deve ter 14 dígitos')
    }

    try {
      const response = await fetch(`https://api.opencnpj.org/${cleanCNPJ}`)

      if (response.status === 429) {
        console.warn('⚠️ OpenCNPJ rate limit excedido, dados de compliance não disponíveis no momento')
        return null // Retorna null silenciosamente, não bloqueia o cadastro
      }

      if (!response.ok) {
        throw new Error('CNPJ não encontrado na Receita Federal')
      }

      const data: OpenCNPJResponse = await response.json()

      return {
        situacao_cadastral: data.situacao_cadastral,
        data_situacao_cadastral: data.data_situacao_cadastral,
        motivo_situacao_cadastral: data.motivo_situacao_cadastral,
        opcao_simples: data.opcao_simples === 'Sim',
        data_opcao_simples: data.data_opcao_simples,
        data_exclusao_simples: data.data_exclusao_simples,
        opcao_mei: data.opcao_mei === 'Sim',
        porte: data.porte,
        natureza_juridica: data.natureza_juridica,
        capital_social: data.capital_social ? parseFloat(data.capital_social.replace(/[^\d,]/g, '').replace(',', '.')) : undefined,
        data_inicio_atividade: data.data_inicio_atividade,
        cnae_principal: data.cnae_principal,
        cnae_principal_descricao: data.cnae_principal_descricao,
        api_source: 'opencnpj',
        raw_data: data
      }
    } catch (error) {
      console.error('Erro ao buscar dados da Receita Federal:', error)
      throw error
    }
  }

  async function saveComplianceData(clientId: string, data: ComplianceData) {
    // Remove campos vazios e strings vazias de datas
    const cleanData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value === '' || value === null || value === undefined) {
        return acc
      }
      acc[key] = value
      return acc
    }, {} as any)

    const { error } = await supabase
      .from('client_compliance')
      .upsert({
        client_id: clientId,
        ...cleanData,
        data_consulta: new Date().toISOString()
      }, {
        onConflict: 'client_id'
      })

    if (error) {
      console.error('Erro ao salvar dados de compliance:', error)
      throw error
    }
  }

  async function getComplianceData(clientId: string): Promise<ComplianceData | null> {
    const { data, error } = await supabase
      .from('client_compliance')
      .select('*')
      .eq('client_id', clientId)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = not found
      console.error('Erro ao buscar dados de compliance:', error)
      return null
    }

    return data
  }

  async function fetchAndSave(cnpj: string, clientId: string) {
    setLoading(true)
    try {
      const data = await fetchFromOpenCNPJ(cnpj)
      if (data && clientId) {
        await saveComplianceData(clientId, data)
        toast.success('Dados da Receita Federal atualizados!')
        return data
      }
      return null
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao consultar Receita Federal'
      toast.error(message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    fetchFromOpenCNPJ,
    saveComplianceData,
    getComplianceData,
    fetchAndSave
  }
}
