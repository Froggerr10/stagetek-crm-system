interface ProductPriceFieldsProps {
  priceBrl: number
  priceUsd: number
  priceEur: number
  unit: string
  onPriceBrlChange: (value: number) => void
  onPriceUsdChange: (value: number) => void
  onPriceEurChange: (value: number) => void
  onUnitChange: (value: string) => void
}

const UNITS = ['un', 'm', 'kg', 'h', 'dia', 'kit', 'lote']
const inputClass = "w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"

export default function ProductPriceFields({
  priceBrl, priceUsd, priceEur, unit,
  onPriceBrlChange, onPriceUsdChange, onPriceEurChange, onUnitChange
}: ProductPriceFieldsProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Preço BRL</label>
        <input type="number" step="0.01" value={priceBrl}
          onChange={e => onPriceBrlChange(parseFloat(e.target.value) || 0)}
          className={inputClass} placeholder="0.00" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Preço USD</label>
        <input type="number" step="0.01" value={priceUsd}
          onChange={e => onPriceUsdChange(parseFloat(e.target.value) || 0)}
          className={inputClass} placeholder="0.00" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Preço EUR</label>
        <input type="number" step="0.01" value={priceEur}
          onChange={e => onPriceEurChange(parseFloat(e.target.value) || 0)}
          className={inputClass} placeholder="0.00" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Unidade</label>
        <select value={unit} onChange={e => onUnitChange(e.target.value)} className={inputClass}>
          {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>
    </div>
  )
}
