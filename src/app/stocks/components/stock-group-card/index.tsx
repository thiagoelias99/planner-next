import { Card } from '@/components/ui/card'
import React from 'react'

export interface StockGroupCardProps {
  label: string
  amount: number
  percentage: number
  count: number
}

const StockGroupCard = ({ amount, label, percentage, count }: StockGroupCardProps) => {
  return (
    <Card className='w-[204px] min-w-[204px] h-[92px] px-2 py-1 flex flex-col justify-start items-center'>
      <div className='w-full flex flex-row justify-between items-center'>
        <h2 className='text-base font-semibold'>{label}</h2>
        <p className='text-sm'>{`${percentage.toFixed(0)}%`}</p>
      </div>
      <div className='w-full flex flex-1 flex-row justify-center items-center'>
        <p className='text-xl font-bold'>{`R$ ${amount.toFixed(2)}`}</p>
      </div>
      <div className='w-full flex flex-row justify-end items-center'>
        <p className='text-sm'>{`${count} ativos`}</p>
      </div>
    </Card>
  )
}

export default StockGroupCard