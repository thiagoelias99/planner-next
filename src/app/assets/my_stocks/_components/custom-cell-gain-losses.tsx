import { TableCell } from '@/components/ui/table'
import { formatCurrency } from '@/lib/format-currency'
import { cn } from '@/lib/utils'

interface Props {
  value: number | undefined
  className?: string
}

export default function CustomCellGainAndLosses({ value = 0, className }: Props) {
  return (
    <TableCell className={cn(`min-w-32 ${value > 0 ? 'text-green-500' : value === 0 ? '' : 'text-red-500'}`, className)}>{formatCurrency(value)}</TableCell>
  )
}
