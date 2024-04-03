import { Header1 } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'
import StockGroupSelect from '../stock-group-select'
import StockCard from '../stock-card'

interface Props {
  classnames?: ClassNameValue
}

const StocksSection = ({ classnames }: Props) => {
  return (
    <section className={cn(
      'px-4',
      classnames
    )}>
      <div className='w-full flex justify-between items-center'>
        <Header1>Ativos</Header1>
        <StockGroupSelect value='all' />
      </div>
      <div className='w-full pt-2 pb-4 flex flex-col justify-start items-start gap-2'>
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
      </div>
    </section>
  )
}

export default StocksSection