import { TableCell } from '@/components/ui/table'
import { formatCurrency } from '@/lib/format-currency'
import { cn } from '@/lib/utils'

interface Props {
  value: number | undefined
  className?: string
}

export default function CustomCellCurrency({ value, className }: Props) {
  return (
    <TableCell className={cn('min-w-44', className)}>{formatCurrency(value)}</TableCell>
  )
}
