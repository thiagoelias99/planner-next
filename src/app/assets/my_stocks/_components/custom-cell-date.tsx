import { TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

interface Props {
  date: Date | string
  className?: string
}

export default function CustomCellDate({ date, className }: Props) {
  return (
    <TableCell className={cn('min-w-36', className)}>{format(new Date(date), 'd MMM yy')}</TableCell>
  )
}
