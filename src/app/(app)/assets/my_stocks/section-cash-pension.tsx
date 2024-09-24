'use client'

import { TableWrapper, TableHeader, TableRow, TableHead, TableBody, Table, TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { CashBoxPension } from '@/models/assets/fixed-income'
import { ClassNameValue } from 'tailwind-merge'
import EditCashBoxDialog from './_components/edit-cash-box-dialog'
import { useState } from 'react'
import LoadingTablePlaceholder from './_components/loading-table-placeholder'
import CustomCellDescription from './_components/custom-cell-description'
import CustomCellCurrency from './_components/custom-cell-currency'
import CustomTableRow from './_components/custom-table-row'
import CustomTableRowSummary from './_components/custom-table-row-summary'

interface MyStocksSectionProps {
  data: CashBoxPension[] | undefined
  isLoading?: boolean
  className?: ClassNameValue
}

export default function CashBoxAndPensionSection({ data, className, isLoading = false }: MyStocksSectionProps) {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState<CashBoxPension | undefined>(undefined)

  return (
    <div className={cn('w-full max-w-[480px] mx-auto', className)}>
      {isLoading ? (<LoadingTablePlaceholder />) : (
        <div className='w-full space-y-2'>
          <div className='w-full flex justify-end items-start gap-2'>
            <EditCashBoxDialog
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
                  <TableHead>Value</TableHead>
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
                    className='cursor-pointer'
                  >
                    <CustomCellDescription>{item.description}</CustomCellDescription>
                    <CustomCellCurrency value={item.value} />
                  </CustomTableRow>
                ))}
                <CustomTableRowSummary className='hover:bg-transparent hover:font-bold'>
                  <TableCell></TableCell>
                  <CustomCellCurrency value={data?.reduce((acc, item) => {
                    return acc + item.value
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
