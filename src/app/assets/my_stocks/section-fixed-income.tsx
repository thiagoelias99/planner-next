import { TableWrapper, TableHeader, TableRow, TableHead, TableBody, Table, TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { FixedIncome } from '@/models/assets/fixed-income'
import { ClassNameValue } from 'tailwind-merge'
import EditFixedIncomeDialog from './_components/edit-fixed-income-dialog'
import { useState } from 'react'
import LoadingTablePlaceholder from './_components/loading-table-placeholder'
import CustomTableRow from './_components/custom-table-row'
import CustomCellDescription from './_components/custom-cell-description'
import CustomCellCurrency from './_components/custom-cell-currency'
import CustomCellDate from './_components/custom-cell-date'
import CustomCellPercentage from './_components/custom-cell-percentage'
import CustomCellPercentageMinimal from './_components/custom-cell-percentage-min'
import CustomTableRowSummary from './_components/custom-table-row-summary'

interface Props {
  data: FixedIncome[] | undefined
  isLoading?: boolean
  className?: ClassNameValue
}

export default function FixedIncomesSection({ data, className, isLoading = false }: Props) {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState<FixedIncome | undefined>(undefined)

  return (
    <div className={cn('w-full', className)}>
      {isLoading ? (<LoadingTablePlaceholder />) :
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
              <Table className=''>
                <TableHeader className=''>
                  <TableRow className='hover:bg-transparent'>
                    <TableHead>Description</TableHead>
                    <TableHead>Investment</TableHead>
                    <TableHead>Current</TableHead>
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
                    <CustomTableRow
                      key={item.id}
                      onClick={() => {
                        setSelectedItem(item)
                        setOpenDialog(true)
                      }}
                      className='hover:cursor-pointer'
                    >
                      <CustomCellDescription>{item.description}</CustomCellDescription>
                      <CustomCellCurrency value={item.initialInvestment} />
                      <CustomCellCurrency value={item.currentValue} />
                      <CustomCellDate date={item.initialDate} />
                      <CustomCellDate date={item.dueDate} />
                      <CustomCellPercentageMinimal value={item.fixedRate} />
                      <TableCell className='min-w-28'>{item.posFixedIndex}</TableCell>
                      <TableCell className='min-w-32'>{item.pastDays}</TableCell>
                      <TableCell className='min-w-32'>{item.remainingDays}</TableCell>
                      <CustomCellPercentageMinimal value={item.taxRate} />
                      <CustomCellCurrency value={item.realValue} />
                      <CustomCellPercentage value={item.profitability} />
                      <CustomCellCurrency value={item.gainsAndLosses} />
                    </CustomTableRow>
                  ))}
                  <CustomTableRowSummary>
                    <TableCell></TableCell>
                    <CustomCellCurrency value={data?.reduce((acc, item) => {
                      return acc + item.initialInvestment
                    }, 0)} />
                    <CustomCellCurrency value={data?.reduce((acc, item) => {
                      return acc + item.currentValue
                    }, 0)} />
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <CustomCellCurrency value={data?.reduce((acc, stock) => {
                      return acc + stock.realValue
                    }, 0)} />
                    <TableCell></TableCell>
                    <CustomCellCurrency value={data?.reduce((acc, stock) => {
                      return acc + stock.gainsAndLosses
                    }, 0)} />
                  </CustomTableRowSummary>
                </TableBody>
              </Table>
            </TableWrapper>
          </div>
        )}
    </div>
  )
}