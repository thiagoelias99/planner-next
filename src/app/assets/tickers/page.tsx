'use client'

import ModuleBar from '@/components/module-bar'
import { Button } from '@/components/ui/button'
import { Header3 } from '@/components/ui/typography'
import useStocks from '@/hooks/assets/use-stocks'
import { formatCurrency } from '@/lib/format-currency'
import { Stock } from '@/models/assets/stock'
import { PlusIcon } from 'lucide-react'
import EditStockDialog from './_components/edit-dialog'
import { useEffect, useState } from 'react'
import InputSearch from '@/components/ui/input-search'

export default function Stocks() {
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [filter, setFilter] = useState('')
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([])
  const { getStocks } = useStocks()

  function handleItemClick(stock: Stock) {
    setSelectedStock(stock)
    setOpenEditDialog(true)
  }

  useEffect(() => {
    if (!getStocks.data) return
    setFilteredStocks(getStocks.data.filter(stock => (stock.ticker.toLowerCase().includes(filter.toLowerCase()) || stock.name.toLowerCase().includes(filter.toLowerCase()))))
  }, [filter, getStocks.data])

  return (
    <div className='py-4'>
      <ModuleBar
        title="Tickers"
        backHref='/assets'
        className='px-4'
      >
        <Button size='icon' onClick={_ => setOpenEditDialog(true)}>
          <PlusIcon />
        </Button>
      </ModuleBar>
      <div className='w-full mt-4 px-4 pb-4 flex flex-col justify-start items-start gap-2'>
        <InputSearch
          containerClassName="w-full"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        <StocksSection title='Stocks' stocks={filteredStocks} handleItemClick={handleItemClick} />
      </div>
      <EditStockDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        selectedStock={selectedStock}
      />
    </div>
  )
}

function StocksSection({ stocks, title, handleItemClick }: {
  stocks?: Stock[],
  title: string,
  handleItemClick?: (stock: Stock) => void
}) {
  return (
    <section className='w-full bg-card px-2 pt-4 pb-4 flex flex-col gap-2 rounded-lg'>
      <ul className='contents'>
        {stocks?.map(stock => (
          <StockItem key={stock.ticker} stock={stock} handleItemClick={handleItemClick} />
        ))}
      </ul>
    </section>
  )
}


function StockItem({ stock, handleItemClick }: {
  stock: Stock
  handleItemClick?: (stock: Stock) => void
}) {
  return (
    <li
      role='button'
      onClick={_ => handleItemClick && handleItemClick(stock)}
      className='w-full bg-card2 text-card2-foreground rounded-lg px-2 pt-3 pb-2 flex flex-col gap-3'>
      <div
        className='w-full inline-flex justify-between items-start'>
        <Header3>{`${stock.ticker.toUpperCase()} - ${stock.name}`}</Header3>
        <p className='text-xs'>{new Date(stock.updatedAt).toLocaleDateString()}</p>
      </div>
      <div className='w-full inline-flex justify-between items-end'>
        <p className='text-sm'>{stock.stockType}</p>
        <p className='text-lg font-bold'>{formatCurrency(stock.price)}</p>
      </div>
    </li>
  )
}