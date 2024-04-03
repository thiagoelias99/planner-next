import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ClassNameValue } from 'tailwind-merge'

interface Props {
  classnames?: ClassNameValue
}

const StockCard = ({ classnames }: Props) => {
  return (
    <Card className={cn(
      'w-full h-[112px] px-2 py-1 flex flex-row justify-between items-center',
      classnames
    )}>
      <div className='h-full flex flex-col justify-between items-start'>
        <div className=''>
          <h2 className='text-lg font-semibold'>PETR4</h2>
          <p className='text-sm'>Petrobras</p>
        </div>
        <div>
          <p className='text-sm'>Lucro/Prejuizo</p>
          <p className='text-sm font-semibold'>R$ 100,00 | 10,00%</p>
        </div>
      </div>
      <div className='h-full flex flex-col justify-between items-end'>
        <p className='text-xl font-semibold'>R$ 9999,99</p>
        <p className='text-base font-semibold'>R$ 11,99</p>
        <p className='text-xs'>qnt <span className='text-sm font-semibold'>20</span></p>
        <p className='text-xs'>pm <span className='text-sm font-semibold'>R$ 10,99</span></p>
      </div>
    </Card>
  )
}

export default StockCard