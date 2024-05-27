import { Card } from '@/components/ui/card'
import { formatCurrency } from '@/lib/format-currency'
import { formatPercentage } from '@/lib/format-percentage'
import { cn } from '@/lib/utils'
import { Stock } from '@/models/user-stock'
import { ClassNameValue } from 'tailwind-merge'

interface StockCardProps {
  classnames?: ClassNameValue
  stock: Stock
}

const StockCard = ({ classnames, stock }: StockCardProps) => {
  const goodPerformance = stock.profitability > 10
  const badPerformance = stock.profitability < 0

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
          <p className={`text-sm font-semibold ${goodPerformance ? 'text-success' : ''} ${badPerformance ? 'text-failure' : ''}`}>{`${formatCurrency(stock.profit)} | ${formatPercentage(stock.profitability / 100)}`}</p>
        </div>
      </div>
      <div className='h-full flex flex-col justify-between items-end'>
        <p className={`text-xl font-semibold md:text-lg ${goodPerformance ? 'text-success' : ''} ${badPerformance ? 'text-failure' : ''}`}>{formatCurrency(stock.stockQuantity * stock.price)}</p>
        <p className='text-base font-semibold'>{formatCurrency(stock.price)}</p>
        <p className='text-xs'>qnt <span className='text-sm font-semibold'>{stock.stockQuantity}</span></p>
        <p className='text-xs'>pm <span className='text-sm font-semibold'>{formatCurrency(stock.averageStockBuyPrice)}</span></p>
      </div>
    </Card>
  )
}

export default StockCard