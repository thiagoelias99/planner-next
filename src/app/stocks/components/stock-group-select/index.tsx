import { ClassNameValue } from 'tailwind-merge'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'


interface Props {
  classnames?: ClassNameValue
  value?: string
  onValueChange?: (value: string) => void
}

const StockGroupSelect = ({ classnames, value, onValueChange }: Props) => {
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
    >
      <SelectTrigger className={cn(
        'w-[98px] h-[28px]',
        classnames
      )}>
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos</SelectItem>
        <SelectItem value="stocks">Ações</SelectItem>
        <SelectItem value="fiis">FIIs</SelectItem>
      </SelectContent>
    </Select>

  )
}

export default StockGroupSelect