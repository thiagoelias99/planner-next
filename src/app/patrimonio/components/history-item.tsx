import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/format-currency'
import { formatPercentage } from '@/lib/format-percentage'
import { AssetHistoryItem } from '@/models/assets/history'
import React from 'react'

interface Props extends Partial<AssetHistoryItem> {
  title: string
}

export default function HistoryItem({ title, difference, grossValue, percentage = 0 }: Props) {
  return (
    <Card>
      <CardContent className='h-20 md:h-28 p-2 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start'>
        <div className='h-full flex flex-col justify-between items-start'>
          <h2 className='text-xl font-bold'>{title}</h2>
          <p>{formatCurrency(grossValue)}</p>
        </div>
        <div className='w-full h-full flex-1 flex flex-col md:flex-row-reverse justify-between items-end'>
          <p className='text-2xl font-bold'>{formatCurrency(difference)}</p>
          <p className='text-xl font-semibold'>{formatPercentage(percentage / 100, { appendSignage: true })}</p>
        </div>
      </CardContent>
    </Card>
  )
}
