import { TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
}

export default function CustomCellDescription({ children, className }: Props) {
  return (
    <TableCell className={cn('text-left line-clamp-1 min-w-48', className)}>{children}</TableCell>
  )
}
