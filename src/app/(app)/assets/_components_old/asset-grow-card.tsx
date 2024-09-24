import { formatCurrency } from '@/lib/format-currency'
import { formatPercentage } from '@/lib/format-percentage'
import { cn } from '@/lib/utils'
import { ArrowDownIcon, ArrowUpIcon, Loader2, Loader2Icon } from 'lucide-react'
import React from 'react'

interface Props {
  title: string
  value: number | undefined
  percentage: number | undefined
  isLoading?: boolean
}

export default function AssetGrowCard({ title, value = 0, percentage = 0, isLoading }: Props) {

  const isPositive = percentage > 0

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <p className='text-xs'>{title}</p>
      {isLoading ? (
        <Loader2Icon className='animate-spin' />
      ) : (
        <div className={cn('w-full flex justify-center items-center gap-1', isPositive ? 'text-success' : 'text-destructive')}>
          {isPositive ? (
            <ArrowUpIcon size={16} />) : (
            <ArrowDownIcon size={16} />)}
          <p>{formatCurrency(value)} ({formatPercentage(percentage)})</p>
        </div>)}
    </div>
  )
}
