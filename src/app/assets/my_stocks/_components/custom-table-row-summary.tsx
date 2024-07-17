import { TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { ClassNameValue } from 'tailwind-merge'

interface CustomTableRowProps {
  children: React.ReactNode
  className?: ClassNameValue
}

export default function CustomTableRowSummary({ children, className }: CustomTableRowProps) {
  return (
    <TableRow className={cn('font-semibold hover:bg-transparent hover:font-bold', className)}>
      {children}
    </TableRow>
  )
}
