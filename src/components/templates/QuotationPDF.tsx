import { Document, Page, Text, View } from '@react-pdf/renderer'
import { pdfStyles as s } from '@/lib/pdfStyles'
import type { QuotationItem } from '@/types'

interface QuotationPDFProps { quotationNumber: string; items: QuotationItem[]; subtotal: number; freight: number; total: number; createdAt?: string }

export default function QuotationPDF({ quotationNumber, items, subtotal, freight, total, createdAt }: QuotationPDFProps) {
  const fmt = (v: number) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}><Text style={s.title}>STAGETEK</Text><Text style={s.subtitle}>Cotação {quotationNumber} • {createdAt || new Date().toLocaleDateString('pt-BR')}</Text></View>
        <View style={s.section}><Text style={s.sectionTitle}>Itens da Cotação</Text>
          <View style={s.table}>
            <View style={s.tableHeader}><Text style={s.col1}>Produto</Text><Text style={s.col2}>Qtd</Text><Text style={s.col3}>Preço Unit.</Text><Text style={s.col4}>Subtotal</Text></View>
            {items.map((item, i) => (<View key={i} style={s.tableRow}><Text style={s.col1}>{item.name}</Text><Text style={s.col2}>{item.quantity}</Text><Text style={s.col3}>{fmt(item.unit_price)}</Text><Text style={s.col4}>{fmt(item.subtotal)}</Text></View>))}
          </View>
        </View>
        <View style={s.totals}>
          <View style={s.totalRow}><Text style={s.totalLabel}>Subtotal:</Text><Text style={s.totalValue}>{fmt(subtotal)}</Text></View>
          <View style={s.totalRow}><Text style={s.totalLabel}>Frete:</Text><Text style={s.totalValue}>{fmt(freight)}</Text></View>
          <View style={[s.totalRow, s.grandTotal]}><Text>Total:</Text><Text>{fmt(total)}</Text></View>
        </View>
        <Text style={s.footer}>STAGETEK Equipamentos para Entretenimento • equipamentos@stagetek.com.br • (11) 1234-5678</Text>
      </Page>
    </Document>
  )
}
