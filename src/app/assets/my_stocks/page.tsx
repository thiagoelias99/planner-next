'use client'

import ModuleBar from '@/components/module-bar'
import { Button } from '@/components/ui/button'
import { RefreshCwIcon } from 'lucide-react'
import React from 'react'
import MyStocksSection from './my-stocks-section'
import useStocks from '@/hooks/assets/use-stocks'

export default function MyStocksPage() {
  const { getSummary } = useStocks()

  return (
    <div className='w-full max-w-[1440px] m-auto p-4'>
      <ModuleBar title="My Orders" backHref='/assets'>
        <Button size='icon'>
          <RefreshCwIcon />
        </Button>
      </ModuleBar>
      <MyStocksSection
        data={getSummary.data?.stocks}
        className='mt-4'
      />
    </div>
  )
}
