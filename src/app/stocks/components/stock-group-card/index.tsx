import { Card } from '@/components/ui/card'
import React from 'react'

const StockGroupCard = () => {
  return (
    <Card className='w-[204px] min-w-[204px] h-[92px] px-2 py-1 flex flex-col justify-start items-center'>
      <div className='w-full flex flex-row justify-between items-center'>
        <h2 className='text-base font-semibold'>Ações</h2>
        <p className='text-sm'>25%</p>
      </div>
      <div className='w-full flex flex-1 flex-row justify-center items-center'>
        <p className='text-xl font-bold'>R$ 9999,99</p>
      </div>
      <div className='w-full flex flex-row justify-end items-center'>
        <p className='text-sm'>20 ativos</p>
      </div>
    </Card>
  )
}

export default StockGroupCard