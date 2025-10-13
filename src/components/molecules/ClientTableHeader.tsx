export default function ClientTableHeader() {
  const columns = ['Nome', 'CNPJ', 'Email', 'Telefone', 'Status', 'Ações']

  return (
    <thead className="bg-white/5 border-b border-white/10">
      <tr>
        {columns.map((col, idx) => (
          <th
            key={col}
            className={`px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider ${
              idx === columns.length - 1 ? 'text-right' : 'text-left'
            }`}
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  )
}
