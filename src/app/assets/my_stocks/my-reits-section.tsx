'use client'

import Percentage from '@/components/ui/percentage'
import { Skeleton } from '@/components/ui/skeleton'
import { TableWrapper, TableHeader, TableRow, TableHead, TableBody, Table, TableCell } from '@/components/ui/table'
import { formatCurrency } from '@/lib/format-currency'
import { cn } from '@/lib/utils'
import { StockSummaryClassView } from '@/models/assets/stock'
import { format } from 'date-fns'
import { ClassNameValue } from 'tailwind-merge'
import EditDividendsDialog from './_components/edit-dividends-dialog'

interface MyStocksSectionProps {
  data: StockSummaryClassView | undefined
  isLoading?: boolean
  className?: ClassNameValue
}

export default function MyReitsSection({ data, className, isLoading = false }: MyStocksSectionProps) {
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
                <TableHead>Current Value</TableHead>
                <TableHead>Average Price</TableHead>
                <TableHead>Profit %</TableHead>
                <TableHead>G & L</TableHead>
                <TableHead>Dividends</TableHead>
                <TableHead>DY</TableHead>
                <TableHead>Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.items.map(stock => (
                <TableRow key={stock.ticker}>
                  <TableCell>{stock.ticker}</TableCell>
                  <TableCell className='text-left line-clamp-1'>{stock.name}</TableCell>
                  <TableCell>{formatCurrency(stock.price)}</TableCell>
                  <TableCell><Percentage value={stock.changePercent / 100} /></TableCell>
                  <TableCell>{stock.quantity}</TableCell>
                  <TableCell>{formatCurrency(stock.currentTotalValue)}</TableCell>
                  <TableCell>{formatCurrency(stock.averagePrice)}</TableCell>
                  <TableCell><Percentage value={stock.profitability} /></TableCell>
                  <TableCell
                    className={`${stock.gainsAndLosses > 0 ? 'text-green-500' : stock.gainsAndLosses === 0 ? '' : 'text-red-500'}`}
                  >{formatCurrency(stock.gainsAndLosses)}</TableCell>
                  {/* <TableCell>{formatCurrency(stock.dividends)}</TableCell> */}
                  <EditDividendsDialog stock={stock} />
                  <TableCell><Percentage value={stock.dividendYield/100} colorize={false} useSymbols={false} /></TableCell>
                  <TableCell className='line-clamp-1'>{format(new Date(stock.updatedAt), 'd MMM yy H:mm')}</TableCell>
                </TableRow>
              ))}
              <TableRow className='hover:bg-transparent hover:font-bold'>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>{formatCurrency(data?.currentTotalValue)}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>{formatCurrency(data?.gainsAndLosses)}</TableCell>
                <TableCell>{formatCurrency(data?.dividends)}</TableCell>
                <TableCell></TableCell>
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
      <div className='w-full flex justify-between'>
        <Skeleton className='w-56 h-12' />
        <Skeleton className='w-48 h-12' />
        <Skeleton className='w-48 h-12' />
        <Skeleton className='w-48 h-12' />
        <Skeleton className='w-36 h-12' />
        <Skeleton className='w-40 h-12' />
        <Skeleton className='w-36 h-12' />
      </div>
      <div className='w-full flex justify-between'>
        <Skeleton className='w-56 h-12' />
        <Skeleton className='w-48 h-12' />
        <Skeleton className='w-48 h-12' />
        <Skeleton className='w-48 h-12' />
        <Skeleton className='w-36 h-12' />
        <Skeleton className='w-40 h-12' />
        <Skeleton className='w-36 h-12' />
      </div>
      <div className='w-full flex justify-between'>
        <Skeleton className='w-56 h-12' />
        <Skeleton className='w-48 h-12' />
        <Skeleton className='w-48 h-12' />
        <Skeleton className='w-48 h-12' />
        <Skeleton className='w-36 h-12' />
        <Skeleton className='w-40 h-12' />
        <Skeleton className='w-36 h-12' />
      </div>
      <div className='w-full flex justify-between'>
        <Skeleton className='w-56 h-12' />
        <Skeleton className='w-48 h-12' />
        <Skeleton className='w-48 h-12' />
        <Skeleton className='w-48 h-12' />
        <Skeleton className='w-36 h-12' />
        <Skeleton className='w-40 h-12' />
        <Skeleton className='w-36 h-12' />
      </div>
    </div>
  )
}
