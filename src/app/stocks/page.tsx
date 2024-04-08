'use client'

import { Stock, StockType, UserStock } from '@/models/user-stock'
import { GraphSection } from './components/graph-section'
import StockGroupsSection from './components/stock-groups-section'
import StocksSection from './components/stocks-section'
import useStocks from '@/hooks/use-stocks'
import { useEffect } from 'react'
import useToken from '@/hooks/use-token'
import { useRouter } from 'next/navigation'


export default function Stocks() {
  // Token is required to access this page
  const { token } = useToken()
  const router = useRouter()
  const { getStocksFromUser: { data } } = useStocks()

  useEffect(() => {
    console.log('token', token)
    if (!token) {
      router.push('/login')
    }
  }, [token])


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