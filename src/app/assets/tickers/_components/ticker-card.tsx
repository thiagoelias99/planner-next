import { Header3 } from '@/components/ui/typography'
import ITickerSection from './ticker-section-interface'
import { formatCurrency } from '@/lib/format-currency'

export default function TickerCard({ stocks, handleItemClick }: ITickerSection) {

  return (
    <section className='w-full bg-card px-2 pt-4 pb-4 flex flex-col gap-2 rounded-lg md:hidden'>
      <ul className='contents'>
        {stocks?.map(stock => (
          <li
            key={stock.ticker}
            role='button'
            onClick={_ => handleItemClick && handleItemClick(stock)}
            className='w-full bg-card2 text-card2-foreground rounded-lg px-2 pt-3 pb-2 flex flex-col gap-3'>
            <div
              className='w-full inline-flex justify-between items-start'>
              <Header3>{`${stock.ticker.toUpperCase()} - ${stock.name}`}</Header3>
              <p className='text-xs'>{new Date(stock.updatedAt).toLocaleDateString()}</p>
            </div>
            <div className='w-full inline-flex justify-between items-end'>
              <p className='text-sm'>{stock.stockType}</p>
              <p className='text-lg font-bold'>{formatCurrency(stock.price)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
