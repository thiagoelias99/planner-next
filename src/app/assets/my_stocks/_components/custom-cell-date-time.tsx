import { TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

interface Props {
  date: Date | string
  className?: string
}

export default function CustomCellDateTime({ date, className }: Props) {
  return (
    <TableCell className={cn('line-clamp-1 min-w-36', className)}>{format(new Date(date), 'd MMM yy H:mm')}</TableCell>
  )
}
