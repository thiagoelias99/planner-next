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
    if (!token) {
      router.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])


  return (
    <main className='flex flex-col'>
      {
        data && (
          <>
            <div className='flex flex-col sm:flex-col-reverse sm:mt-4'>
              <GraphSection userStockData={data} className='mt-4' />
              <StockGroupsSection userStockData={data} className='mt-4 sm:mt-0 sm:self-center' />
            </div>
            <StocksSection userStockData={data} className='mt-4' />
          </>
        )
      }
    </main>
  )
} 