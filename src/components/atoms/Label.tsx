interface LabelProps {
  children: React.ReactNode
  htmlFor?: string
  required?: boolean
  className?: string
}

export default function Label({ children, htmlFor, required, className = '' }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-300 mb-1.5 ${className}`}
    >
      {children}
      {required && <span className="text-[#e90101] ml-1">*</span>}
    </label>
  )
}
