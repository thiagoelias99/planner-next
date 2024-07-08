'use client'

import ModuleBar from '@/components/module-bar'
import { Button } from '@/components/ui/button'
import { Header2, Header3 } from '@/components/ui/typography'
import useStocks from '@/hooks/assets/use-stocks'
import { formatCurrency } from '@/lib/format-currency'
import { Stock } from '@/models/assets/stock'
import { PlusIcon } from 'lucide-react'

export default function Stocks() {
  const { getStocks } = useStocks()

  return (
    <div className='py-4'>
      <ModuleBar
        title="Stocks"
        backHref='/assets'
        className='px-4'
      >
        <Button size='icon'>
          <PlusIcon />
        </Button>
      </ModuleBar>
      <div className='w-full mt-4 px-4 pb-4 flex flex-col justify-start items-start gap-2'>
        <StocksSection title='Stocks' stocks={getStocks.data} />
      </div>
    </div>
  )
}

function StocksSection({stocks, title}: {stocks?: Stock[], title: string}) {
  return (
    <section className='w-full bg-card px-2 pt-4 pb-4 flex flex-col gap-2 rounded-lg'>
      <Header2>{title}</Header2>
      <ul className='contents'>
        {stocks?.map(stock => (
          <StockItem key={stock.ticker} {...stock} />
        ))}
      </ul>
    </section>
  )
}


function StockItem(stock: Stock) {
  return (
    <li className='w-full bg-card2 text-card2-foreground rounded-lg px-2 pt-3 pb-2 flex flex-col gap-3'>
      <div className='w-full inline-flex justify-between items-start'>
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