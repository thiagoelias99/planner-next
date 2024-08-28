import { Header1 } from '@/components/ui/typography'
import { format } from 'date-fns'
import BalanceCard from './_components/balance-card'

export default function Page() {
  return (
    <div className='w-full px-10 py-4'>
      <Header1>My assets portfolio in {format(new Date(), 'MMMM, d yyyy')}</Header1>
      <BalanceCard className='mt-4'/>
    </div>
  )
}
