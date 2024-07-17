import { TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { ClassNameValue } from 'tailwind-merge'

interface CustomTableRowProps {
  children: React.ReactNode
  className?: ClassNameValue
  onClick?: () => void
}

export default function CustomTableRow({ children, className, onClick }: CustomTableRowProps) {
  return (
    <TableRow
      onClick={onClick}
      className={cn('hover:bg-primary hover:text-primary-foreground transition-colors duration-300', className)}>
      {children}
    </TableRow>
  )
}
