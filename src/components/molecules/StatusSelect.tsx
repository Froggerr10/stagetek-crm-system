interface StatusSelectProps {
  value: 'active' | 'inactive'
  onChange: (value: 'active' | 'inactive') => void
}

export default function StatusSelect({ value, onChange }: StatusSelectProps) {
  return (
    <div>
      <label className="block text-base font-medium text-gray-300 mb-2">Status *</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as 'active' | 'inactive')}
        required
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-stagetek-red"
      >
        <option value="active" className="bg-gray-900 text-white">Ativo</option>
        <option value="inactive" className="bg-gray-900 text-white">Inativo</option>
      </select>
    </div>
  )
}
