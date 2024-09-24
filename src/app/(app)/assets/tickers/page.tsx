'use client'

import ModuleBar from '@/components/module-bar'
import { Button } from '@/components/ui/button'
import useStocks from '@/hooks/assets/use-stocks'
import { Stock } from '@/models/assets/stock'
import { PlusIcon } from 'lucide-react'
import EditStockDialog from './_components/edit-dialog'
import { useEffect, useState } from 'react'
import InputSearch from '@/components/ui/input-search'
import TickerTable from './_components/ticker-table'
import TickerCard from './_components/ticker-card'

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
        <TickerCard stocks={filteredStocks} handleItemClick={handleItemClick} />
        <TickerTable
          stocks={filteredStocks}
          handleItemClick={handleItemClick}
        />
      </div>
      <EditStockDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        selectedStock={selectedStock}
      />
    </div>
  )
}