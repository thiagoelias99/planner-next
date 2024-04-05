import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Stock } from '@/models/user-stock'
import { ClassNameValue } from 'tailwind-merge'

interface StockCardProps {
  classnames?: ClassNameValue
  stock: Stock
}

const StockCard = ({ classnames, stock }: StockCardProps) => {
  return (
    <Card className={cn(
      'w-full h-[112px] px-2 py-1 flex flex-row justify-between items-center',
      classnames
    )}>
      <div className='h-full flex flex-col justify-between items-start'>
        <div className='w-full'>
          <h2 className='text-lg font-semibold'>{stock.ticker}</h2>
          <p className='max-w-[192px] text-xs truncate'>{stock.name}</p>
        </div>
        <div>
          <p className='text-sm'>Lucro/Prejuizo</p>
          <p className='text-sm font-semibold'>{`R$ 100,00 | ${stock.profitability.toFixed(2)}%`}</p>
        </div>
      </div>
      <div className='h-full flex flex-col justify-between items-end'>
        <p className='text-xl font-semibold'>{`R$ ${(stock.stockQuantity * stock.price).toFixed(2)}`}</p>
        <p className='text-base font-semibold'>{`R$ ${stock.price.toFixed(2)}`}</p>
        <p className='text-xs'>qnt <span className='text-sm font-semibold'>{stock.stockQuantity}</span></p>
        <p className='text-xs'>pm <span className='text-sm font-semibold'>{`R$ ${stock.averageStockBuyPrice.toFixed(2)}`}</span></p>
      </div>
    </Card>
  )
}

export default StockCard