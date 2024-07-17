import Percentage from '@/components/ui/percentage'
import { TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface Props {
  value: number
  className?: string
}

export default function CustomCellPercentage({ value, className }: Props) {
  return (
    <TableCell className={cn('min-w-44', className)}><Percentage value={value} /></TableCell>
  )
}
