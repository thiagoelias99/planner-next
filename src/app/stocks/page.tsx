'use client'

import { Stock, StockType, UserStock } from '@/models/user-stock'
import { GraphSection } from './components/graph-section'
import StockGroupsSection from './components/stock-groups-section'
import StocksSection from './components/stocks-section'
import useStocks from '@/hooks/useStocks'
import { useEffect } from 'react'


export default function Stocks() {
  const { getStocksFromUser: { data } } = useStocks()

  return (
    <main className='flex flex-col gap-4'>
      {
        data && (
          <>
            <GraphSection userStockData={data} />
            <StockGroupsSection userStockData={data} />
            <StocksSection userStockData={data} />
          </>
        )
      }
    </main>
  )
} 