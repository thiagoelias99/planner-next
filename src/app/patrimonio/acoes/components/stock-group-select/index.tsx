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
  values?: {value: string, label: string}[]
  value?: string
  onValueChange?: (value: string) => void
}

const StockGroupSelect = ({ classnames, values, value, onValueChange }: Props) => {
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
    >
      <SelectTrigger className={cn(
        'w-[138px] h-[28px]',
        classnames
      )}>
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        {values?.map((item, index) => (
          <SelectItem key={index} value={item.value}>{item.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>

  )
}

export default StockGroupSelect