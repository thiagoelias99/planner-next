'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TableCell } from '@/components/ui/table'
import useStocks from '@/hooks/assets/use-stocks'
import { formatCurrency } from '@/lib/format-currency'
import { StockSummaryItem } from '@/models/assets/stock'
import { useState } from 'react'

interface EditDividendsDialogProps {
  stock: StockSummaryItem
}

export default function EditDividendsDialog({ stock }: EditDividendsDialogProps) {
  const [dividendsPerUnit, setDividendsPerUnit] = useState(stock.dividends)
  const [dividends, setDividends] = useState(stock.dividends * stock.quantity)
  const [open, setOpen] = useState(false)
  const { updateStock } = useStocks()

  function handleDividendsPerUnitChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDividendsPerUnit(Number(event.target.value))
    setDividends(Number(event.target.value) * stock.quantity)
  }

  function handleDividendsChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDividends(Number(event.target.value))
    setDividendsPerUnit(Number(event.target.value) / stock.quantity)
  }

  function handleSave() {
    updateStock.mutate({ ticker: stock.ticker, dividends: dividendsPerUnit })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TableCell className='cursor-pointer'>{formatCurrency(stock.dividends * stock.quantity)}</TableCell>
      </DialogTrigger>
      <DialogContent className='w-[280px]'>
        <DialogHeader>
          <DialogTitle>{`Edit Dividends for ${stock.ticker}`}</DialogTitle>
        </DialogHeader>
        <div className='w-full flex flex-col justify-between items-start gap-4'>
          <div className='w-full flex flex-col justify-center items-center gap-1'>
            <Label className='w-full font-semibold'>Dividends per Unit</Label>
            <div className='w-full flex justify-start items-center gap-2'>
              <span className='text-muted-foreground'>R$</span>
              <Input
                className='text-center'
                type='number'
                value={dividendsPerUnit}
                onChange={handleDividendsPerUnitChange}
                min={0}
                step={0.1}
              />
            </div>
          </div>
          <div className='w-full flex flex-col justify-center items-center gap-1'>
            <Label className='w-full font-semibold'>Dividends</Label>
            <div className='w-full flex justify-start items-center gap-2'>
              <span className='text-muted-foreground'>R$</span>
              <Input
                className='text-center'
                type='number'
                value={dividends}
                onChange={handleDividendsChange}
                min={0}
                step={1}
              />
            </div>
          </div>
        </div>
        <Button onClick={handleSave} className='w-full'>Save</Button>
      </DialogContent>
    </Dialog>
  )
}
