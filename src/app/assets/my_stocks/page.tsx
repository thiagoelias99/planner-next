import ModuleBar from '@/components/module-bar'
import StockTabs from './stock-tabs'
import { Suspense } from 'react'

export default function MyStocksPage() {
  return (
    <div className='w-full max-w-[1440px] m-auto p-4'>
      <ModuleBar title="My Stocks" backHref='/assets'>
      </ModuleBar>
      <Suspense fallback={<div>Loading...</div>}>
        <StockTabs />
      </Suspense>
    </div>
  )
}