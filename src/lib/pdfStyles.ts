import { StyleSheet } from '@react-pdf/renderer'

export const pdfStyles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10 },
  header: { marginBottom: 20, borderBottom: '2 solid #e90101', paddingBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#e90101', marginBottom: 5 },
  subtitle: { fontSize: 10, color: '#666' },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  table: { width: '100%' },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f5f5f5', padding: 8, fontWeight: 'bold', fontSize: 9 },
  tableRow: { flexDirection: 'row', padding: 8, borderBottom: '1 solid #eee' },
  col1: { width: '50%' },
  col2: { width: '15%', textAlign: 'right' },
  col3: { width: '20%', textAlign: 'right' },
  col4: { width: '15%', textAlign: 'right' },
  totals: { marginTop: 10, alignItems: 'flex-end' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', width: 200, padding: 5 },
  totalLabel: { fontSize: 10 },
  totalValue: { fontSize: 10, fontWeight: 'bold' },
  grandTotal: { fontSize: 14, fontWeight: 'bold', color: '#e90101', borderTop: '2 solid #e90101', paddingTop: 5 },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, fontSize: 8, color: '#999', textAlign: 'center' },
})
