import { formatCurrency } from '@/lib/format-currency'
import { formatPercentage } from '@/lib/format-percentage'
import { cn } from '@/lib/utils'
import { ArrowDownIcon, ArrowUpIcon, Loader2, Loader2Icon } from 'lucide-react'
import React from 'react'

interface Props {
  value: number | undefined
  percentage: number | undefined
  isLoading?: boolean
}

export default function AssetAdjustCard({value = 0, percentage = 0, isLoading }: Props) {

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <p className='text-xs'>To Adjust in {formatPercentage(percentage)}</p>
      {isLoading ? (
        <Loader2Icon className='animate-spin' />
      ) : (
        <div className={cn('w-full flex justify-center items-center gap-1', )}>

          <p>{formatCurrency(value)}</p>
        </div>)}
    </div>
  )
}
