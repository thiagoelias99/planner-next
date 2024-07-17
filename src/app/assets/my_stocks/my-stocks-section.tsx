import Percentage from '@/components/ui/percentage'
import { Skeleton } from '@/components/ui/skeleton'
import { TableWrapper, TableHeader, TableRow, TableHead, TableBody, Table, TableCell } from '@/components/ui/table'
import { formatCurrency } from '@/lib/format-currency'
import { cn } from '@/lib/utils'
import { StockSummaryItem } from '@/models/assets/stock'
import { format } from 'date-fns'
import { ClassNameValue } from 'tailwind-merge'

interface MyStocksSectionProps {
  data: StockSummaryItem[] | undefined
  isLoading?: boolean
  className?: ClassNameValue
}

export default function MyStocksSection({ data, className, isLoading = false }: MyStocksSectionProps) {
  return (
    <div className={cn('w-full', className)}>
      {isLoading ? (<LoadingPlaceholder />) : (
        <TableWrapper className=''>
          <Table className='relative'>
            <TableHeader className=''>
              <TableRow className='hover:bg-transparent'>
                <TableHead>Ticker</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Curr. Value</TableHead>
                <TableHead>Ave. Price</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>G&L</TableHead>
                <TableHead>Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map(stock => (
                <TableRow key={stock.ticker}>
                  <TableCell>{stock.ticker}</TableCell>
                  <TableCell className='text-left line-clamp-1 min-w-48'>{stock.name}</TableCell>
                  <TableCell className='min-w-32'>{formatCurrency(stock.price)}</TableCell>
                  <TableCell><Percentage value={stock.changePercent / 100} /></TableCell>
                  <TableCell>{stock.quantity}</TableCell>
                  <TableCell className='min-w-32'>{formatCurrency(stock.currentTotalValue)}</TableCell>
                  <TableCell className='min-w-32'>{formatCurrency(stock.averagePrice)}</TableCell>
                  <TableCell><Percentage value={stock.profitability} /></TableCell>
                  <TableCell
                    className={`min-w-32 ${stock.gainsAndLosses > 0 ? 'text-green-500' : stock.gainsAndLosses === 0 ? '' : 'text-red-500'}`}
                  >{formatCurrency(stock.gainsAndLosses)}</TableCell>
                  <TableCell className='line-clamp-1 min-w-36'>{format(new Date(stock.updatedAt), 'd MMM yy H:mm')}</TableCell>
                </TableRow>
              ))}
              <TableRow className='hover:bg-transparent hover:font-bold'>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>{formatCurrency(data?.reduce((acc, stock) => {
                  return acc + stock.currentTotalValue
                }, 0))}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>{formatCurrency(data?.reduce((acc, stock) => {
                  return acc + stock.gainsAndLosses
                }, 0))}</TableCell>
                <TableCell></TableCell>
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
          <Skeleton className='w-36 h-12' />
          <Skeleton className='w-40 h-12' />
        </div>
      ))}
    </div>
  )
}
