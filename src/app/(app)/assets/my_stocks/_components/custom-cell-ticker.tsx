import { TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
}

export default function CustomCellTicker({ children, className }: Props) {
  return (
    <TableCell className={cn('min-w-28 font-semibold', className)}>{children}</TableCell>
  )
}
