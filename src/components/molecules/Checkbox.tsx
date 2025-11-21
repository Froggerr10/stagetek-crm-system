import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn as _cn } from '@/lib/utils'

interface CheckboxProps {
  label?: string
  className?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  id?: string
}

export default function Checkbox({ label, className = '', id, ...props }: CheckboxProps) {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

  if (!label) {
    return <ShadcnCheckbox className={className} id={checkboxId} {...props} />
  }

  return (
    <div className="flex items-center space-x-2">
      <ShadcnCheckbox className={className} id={checkboxId} {...props} />
      <Label htmlFor={checkboxId} className="text-sm font-normal cursor-pointer">
        {label}
      </Label>
    </div>
  )
}
