import ModuleBar from '@/components/module-bar'
import { Button } from '@/components/ui/button'
import { Header2, Header3 } from '@/components/ui/typography'
import { formatCurrency } from '@/lib/format-currency'
import { PlusIcon } from 'lucide-react'

export default function Stocks() {
  return (
    <div className='py-4'>
      <ModuleBar
        title="Stocks"
        backHref='/assets'
        className='px-4'
      >
        <Button size='icon'>
          <PlusIcon />
        </Button>
      </ModuleBar>
      <div className='w-full mt-4 px-4 pb-4 flex flex-col justify-start items-start gap-2'>
        <StocksSection />
        <StocksSection />
        <StocksSection />
      </div>
    </div>
  )
}

function StocksSection() {
  return (
    <section className='w-full bg-card px-2 pt-4 pb-4 flex flex-col gap-2 rounded-lg'>
      <Header2>Stocks</Header2>
      <ul className='contents'>
        <StockItem />
        <StockItem />
        <StockItem />
      </ul>
    </section>
  )
}

function StockItem() {
  return (
    <li className='w-full bg-card2 text-card2-foreground rounded-lg px-2 pt-3 pb-2 flex flex-col gap-3'>
      <div className='w-full inline-flex justify-between items-start'>
        <Header3>PETR4 - Petrobras S/A</Header3>
        <p className='text-xs'>07/07/2024</p>
      </div>
      <div className='w-full inline-flex justify-between items-end'>
        <p className='text-sm'>Stock</p>
        <p className='text-lg font-bold'>{formatCurrency(1000000)}</p>
      </div>
    </li>
  )
}