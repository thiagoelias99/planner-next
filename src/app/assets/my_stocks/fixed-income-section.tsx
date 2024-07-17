import Percentage from '@/components/ui/percentage'
import { Skeleton } from '@/components/ui/skeleton'
import { TableWrapper, TableHeader, TableRow, TableHead, TableBody, Table, TableCell } from '@/components/ui/table'
import { formatCurrency } from '@/lib/format-currency'
import { cn } from '@/lib/utils'
import { FixedIncome } from '@/models/assets/fixed-income'
import { format } from 'date-fns'
import { ClassNameValue } from 'tailwind-merge'
import EditFixedIncomeDialog from './_components/edit-fixed-income-dialog'
import { useState } from 'react'

interface MyStocksSectionProps {
  data: FixedIncome[] | undefined
  isLoading?: boolean
  className?: ClassNameValue
}

export default function FixedIncomesSection({ data, className, isLoading = false }: MyStocksSectionProps) {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState<FixedIncome | undefined>(undefined)

  return (
    <div className={cn('w-full', className)}>
      {isLoading ? (<LoadingPlaceholder />) :
        (
          <div className='w-full space-y-2'>
            <div className='w-full flex justify-end items-start gap-2'>
              <EditFixedIncomeDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            </div>
            <TableWrapper className=''>
              <Table className='relative'>
                <TableHeader className=''>
                  <TableRow className='hover:bg-transparent'>
                    <TableHead>Description</TableHead>
                    <TableHead>Investment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Fix Rate</TableHead>
                    <TableHead>Pos Index</TableHead>
                    <TableHead>Past Days</TableHead>
                    <TableHead>Rem. Days</TableHead>
                    <TableHead>Tax Rate</TableHead>
                    <TableHead>Real Value</TableHead>
                    <TableHead>Profit</TableHead>
                    <TableHead>G&L</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map(item => (
                    <TableRow
                      key={item.id}
                      onClick={() => {
                        setSelectedItem(item)
                        setOpenDialog(true)
                      }}
                    >
                      <TableCell className='text-left line-clamp-1 min-w-48'>{item.description}</TableCell>
                      <TableCell className='min-w-32'>{formatCurrency(item.initialInvestment)}</TableCell>
                      <TableCell className='min-w-28'>{format(new Date(item.initialDate), 'd MMM yy')}</TableCell>
                      <TableCell className='min-w-28'>{format(new Date(item.dueDate), 'd MMM yy')}</TableCell>
                      <TableCell className='min-w-24'><Percentage useSymbols={false} colorize={false} value={item.fixedRate} /></TableCell>
                      <TableCell className='min-w-28'>{item.posFixedIndex}</TableCell>
                      <TableCell className='min-w-32'>{item.pastDays}</TableCell>
                      <TableCell className='min-w-32'>{item.remainingDays}</TableCell>
                      <TableCell className='min-w-28'><Percentage useSymbols={false} colorize={false} value={item.taxRate} /></TableCell>
                      <TableCell className='min-w-32'>{formatCurrency(item.realValue)}</TableCell>
                      <TableCell><Percentage value={item.profitability} /></TableCell>
                      <TableCell className='min-w-32'>{formatCurrency(item.gainsAndLosses)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className='hover:bg-transparent hover:font-bold'>
                    <TableCell></TableCell>
                    <TableCell>{formatCurrency(data?.reduce((acc, item) => {
                      return acc + item.initialInvestment
                    }, 0))}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>{formatCurrency(data?.reduce((acc, stock) => {
                      return acc + stock.realValue
                    }, 0))}</TableCell>
                    <TableCell></TableCell>
                    <TableCell>{formatCurrency(data?.reduce((acc, stock) => {
                      return acc + stock.gainsAndLosses
                    }, 0))}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableWrapper>
          </div>
        )}
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
