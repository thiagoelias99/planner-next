'use client'

import { Header1 } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import React, { useEffect } from 'react'
import { ClassNameValue } from 'tailwind-merge'
import StockGroupSelect from '../stock-group-select'
import StockCard from '../stock-card'
import { Stock, UserStock } from '@/models/user-stock'

interface Props {
  className?: ClassNameValue
  userStockData: UserStock
}

const StocksSection = ({ className: classnames, userStockData }: Props) => {
  const [filter, setFilter] = React.useState('all')
  const [stocks, setStocks] = React.useState<Stock[]>([])

  const groupValues: { value: string, label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'stocks', label: 'Ações' },
    { value: 'reits', label: 'FIIs' },
    { value: 'internationals', label: 'Internacionais' },
    { value: 'cryptos', label: 'Criptomoedas' },
    { value: 'gold', label: 'Ouro' },
  ]

  useEffect(() => {
    if (filter === 'all') {
      const allStocks = [
        ...userStockData.stocks.data,
        ...userStockData.reits.data,
        ...userStockData.internationals.data,
        ...userStockData.cryptos.data,
        ...userStockData.gold.data
      ]
      setStocks(allStocks)
    } else {
      setStocks(userStockData[filter].data as Stock[])
    }
  }, [userStockData, filter])

  return (
    <section className={cn(
      'px-4 w-full max-w-[1539px] m-auto',
      classnames
    )}>
      <div className='w-full flex justify-between items-center'>
        <Header1>Ativos</Header1>
        <StockGroupSelect
          values={groupValues}
          value={filter}
          onValueChange={(value) => setFilter(value)}
        />
      </div>
      <div className='w-full pt-2 pb-4 grid gap-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4'>
        {stocks.map(stock => {
          return (
            <StockCard
              key={stock.ticker}
              stock={stock}
            />
          )
        })}
      </div>
    </section>
  )
}

export default StocksSection