import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/format-currency'
import React from 'react'

export default function HistoryItem() {
  return (
    <Card>
      <CardContent className='h-20 p-2 flex flex-row justify-between items-center'>
        <div className='h-full flex flex-col justify-between items-start'>
          <h2 className='text-xl font-bold'>Investimentos</h2>
          <p>{formatCurrency(99999.99)}</p>
        </div>
        <div className='h-full flex-1 flex flex-col justify-between items-end'>
          <p className='text-2xl font-bold'>{formatCurrency(99999.99)}</p>
          <p className='text-xl font-semibold'>+ 100,00%</p>
        </div>
      </CardContent>
    </Card>
  )
}
