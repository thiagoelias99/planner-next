import { Skeleton } from '@/components/ui/skeleton'
import { TableWrapper, TableHeader, TableRow, TableHead, TableBody, Table, TableCell } from '@/components/ui/table'
import { formatCurrency } from '@/lib/format-currency'
import { cn } from '@/lib/utils'
import { CashBoxPension } from '@/models/assets/fixed-income'
import { ClassNameValue } from 'tailwind-merge'

interface MyStocksSectionProps {
  data: CashBoxPension[] | undefined
  isLoading?: boolean
  className?: ClassNameValue
}

export default function CashBoxSection({ data, className, isLoading = false }: MyStocksSectionProps) {
  return (
    <div className={cn('w-full max-w-[480px]', className)}>
      {isLoading ? (<LoadingPlaceholder />) : (
        <TableWrapper className=''>
          <Table className='relative'>
            <TableHeader className=''>
              <TableRow className='hover:bg-transparent'>
                <TableHead>Description</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map(item => (
                <TableRow key={item.id}>
                  <TableCell className='text-left line-clamp-1'>{item.description}</TableCell>
                  <TableCell>{formatCurrency(item.value)}</TableCell>
                </TableRow>
              ))}
              <TableRow className='hover:bg-transparent hover:font-bold'>
                <TableCell></TableCell>
                <TableCell>{formatCurrency(data?.reduce((acc, item) => {
                  return acc + item.value
                }, 0))}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableWrapper>)}
    </div>
  )
}

function LoadingPlaceholder() {
  return (
    <div className='w-full space-y-4 rounded-lg p-4'>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <div key={index} className='w-full flex justify-between'>
          <Skeleton className='w-56 h-12' />
          <Skeleton className='w-48 h-12' />
        </div>
      ))}
    </div>
  )
}
