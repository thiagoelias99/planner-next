import Percentage from '@/components/ui/percentage'
import { TableFrame, TableWrapper, TableHeader, TableRow, TableHead, TableBody, Table, TableCell } from '@/components/ui/table'
import { formatCurrency } from '@/lib/format-currency'
import { cn } from '@/lib/utils'
import { StockSummaryItem } from '@/models/assets/stock'
import { format } from 'date-fns'
import { ClassNameValue } from 'tailwind-merge'

interface MyStocksSectionProps {
  data: StockSummaryItem[] | undefined
  className?: ClassNameValue
}

export default function MyStocksSection({ data, className }: MyStocksSectionProps) {
  return (
    <div className={cn('w-full', className)}>
      <TableFrame>
        <div className='w-full flex justify-between items-baseline'>
          <span className='text-lg font-bold text-card-foreground'>Stocks</span>
        </div>
        <TableWrapper className='max-h-[480px]'>
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
                <TableHead>Profitability</TableHead>
                <TableHead>Gain & Losses</TableHead>
                <TableHead>Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map(stock => (
                <TableRow key={stock.ticker}>
                  <TableCell>{stock.ticker}</TableCell>
                  <TableCell className='text-left'>{stock.name}</TableCell>
                  <TableCell>{formatCurrency(stock.price)}</TableCell>
                  <TableCell><Percentage value={stock.changePercent} /></TableCell>
                  <TableCell>{stock.quantity}</TableCell>
                  <TableCell>{formatCurrency(stock.currentTotalValue)}</TableCell>
                  <TableCell>{formatCurrency(stock.averagePrice)}</TableCell>
                  <TableCell><Percentage value={stock.profitability} /></TableCell>
                  <TableCell
                    className={`${stock.gainsAndLosses > 0 ? 'text-green-500' : stock.gainsAndLosses === 0 ? '' : 'text-red-500'}`}
                  >{formatCurrency(stock.gainsAndLosses)}</TableCell>
                  <TableCell>{format(new Date(stock.updatedAt), 'd MMM yy')}</TableCell>
                </TableRow>
              ))}
              <TableRow>
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
        </TableWrapper>
      </TableFrame>
    </div>
  )
}
