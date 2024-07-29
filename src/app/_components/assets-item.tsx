'use client'

import { Card2 } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import useAssets from '@/hooks/assets/use-assets'
import { formatCurrency } from '@/lib/format-currency'
import { formatPercentage } from '@/lib/format-percentage'
import { cn } from '@/lib/utils'
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'

export default function AssetsItem() {
  const { getSummary } = useAssets()

  return (
    <Card2 className='w-full flex justify-between items-center px-4 py-2'>
      {getSummary.isLoading ? (
        <LoadingPlaceholder />
      ) : (
        <div className='contents'>
          <div className='space-y-2'>
            <p className='font-semibold'>Current balance</p>
            <div className={cn(`flex justify-start items-center ${getSummary.data?.lastMonthHistoric.generalGainLosses && getSummary.data.lastMonthHistoric.generalGainLosses > 0 ? 'text-success' : 'text-destructive'}`,)}>
              {getSummary.data?.lastMonthHistoric.generalGainLosses && getSummary.data.lastMonthHistoric.generalGainLosses > 0 ? <ArrowUpIcon size={20} /> : <ArrowDownIcon size={20} />
              }
              <p className='text-sm'>{formatCurrency(getSummary.data?.lastMonthHistoric.generalGainLosses)} ({formatPercentage(getSummary.data?.lastMonthHistoric.generalPercentage)})</p>
            </div>
            <div className={cn(`flex justify-start items-center ${getSummary.data?.lastMonthHistoric.generalGainLosses && getSummary.data.lastMonthHistoric.generalGainLosses > 0 ? 'text-success' : 'text-destructive'}`,)}>
              {getSummary.data?.lastMonthHistoric.generalGainLosses && getSummary.data.lastMonthHistoric.generalGainLosses > 0 ? <ArrowUpIcon size={20} /> : <ArrowDownIcon size={20} />
              }
              <p className='text-sm'>{formatCurrency(getSummary.data?.lastMonthHistoric.passiveGainLosses)} ({formatPercentage(getSummary.data?.lastMonthHistoric.passiveGainLossesPercentage)}) passive</p>
            </div>
          </div>
          <p className='text-lg font-bold'>{formatCurrency(getSummary.data?.currentTotalValue)}</p>
        </div>
      )}
    </Card2>
  )
}

function LoadingPlaceholder() {
  return (
    <div className='contents'>
      <div className='space-y-2'>
        <Skeleton className=''>Current balance</Skeleton>
        <div className={cn('flex justify-start items-center',)}>
          <Skeleton>R$ 10.000,00 (10,00%)</Skeleton>
        </div>
      </div>
      <Skeleton className='text-xl font-bold'>R$ 1.000.000,00</Skeleton>
    </div>
  )
}