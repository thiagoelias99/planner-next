'use client'

import { TableWrapper, TableHeader, TableRow, TableHead, TableBody, Table, TableCell } from '@/components/ui/table'
import { formatCurrency } from '@/lib/format-currency'
import { cn } from '@/lib/utils'
import { StockSummaryClassView } from '@/models/assets/stock'
import { ClassNameValue } from 'tailwind-merge'
import EditDividendsDialog from './_components/edit-dividends-dialog'
import NextLink from 'next/link'
import { Button } from '@/components/ui/button'
import CustomCellDateTime from './_components/custom-cell-date-time'
import CustomTableRow from './_components/custom-table-row'
import CustomCellCurrency from './_components/custom-cell-currency'
import CustomCellTicker from './_components/custom-cell-ticker'
import CustomCellDescription from './_components/custom-cell-description'
import CustomCellPercentage from './_components/custom-cell-percentage'
import CustomCellGainAndLosses from './_components/custom-cell-gain-losses'
import CustomCellPercentageMinimal from './_components/custom-cell-percentage-min'
import LoadingTablePlaceholder from './_components/loading-table-placeholder'
import CustomTableRowSummary from './_components/custom-table-row-summary'

interface Props {
  data: StockSummaryClassView | undefined
  isLoading?: boolean
  className?: ClassNameValue
}

export default function MyReitsSection({ data, className, isLoading = false }: Props) {
  return (
    <div className={cn('w-full', className)}>
      {isLoading ? (<LoadingTablePlaceholder />) : (
        <div className='w-full space-y-2'>
          <div className='w-full flex justify-end items-start gap-2'>
            <NextLink href='/assets/orders'>
              <Button>
                Orders
              </Button>
            </NextLink>
            <NextLink href='/assets/stocks'>
              <Button>
                Tickers
              </Button>
            </NextLink>
          </div>
          <TableWrapper className=''>
            <Table className=''>
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
                  <TableHead>Dividends</TableHead>
                  <TableHead>DY</TableHead>
                  <TableHead>Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.items.map(stock => (
                  <CustomTableRow key={stock.ticker}>
                    <CustomCellTicker>{stock.ticker}</CustomCellTicker>
                    <CustomCellDescription>{stock.name}</CustomCellDescription>
                    <CustomCellCurrency value={stock.price} />
                    <CustomCellPercentage value={stock.changePercent / 100} />
                    <TableCell>{stock.quantity}</TableCell>
                    <CustomCellCurrency value={stock.currentTotalValue} />
                    <CustomCellCurrency value={stock.averagePrice} />
                    <CustomCellPercentage value={stock.profitability} />
                    <CustomCellGainAndLosses value={stock.gainsAndLosses} />
                    <EditDividendsDialog stock={stock} />
                    <CustomCellPercentageMinimal value={stock.dividendYield / 100} />
                    <CustomCellDateTime date={stock.updatedAt} />
                  </CustomTableRow>
                ))}
                <CustomTableRowSummary>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <CustomCellCurrency value={data?.currentTotalValue} />
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>{formatCurrency(data?.gainsAndLosses)}</TableCell>
                  <TableCell>{formatCurrency(data?.dividends)}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </CustomTableRowSummary>
              </TableBody>
            </Table>
          </TableWrapper>
        </div>
      )}
    </div>
  )
}