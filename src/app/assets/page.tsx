import { Header1 } from '@/components/ui/typography'
import { format } from 'date-fns'
import BalanceCard from './_components/balance-card'
import CurrentAssetsCard from './_components/current-assets-card'
import AssetsTable from './_components/assets-table'

export default function Page() {
  return (
    <div className='w-full max-w-screen-2xl mx-auto px-10 py-4'>
      <Header1>My assets portfolio in {format(new Date(), 'MMMM, d yyyy')}</Header1>
      <div className='w-full grid grid-cols-3 gap-4'>
        <BalanceCard className='col-span-2' />
        <CurrentAssetsCard />
        <AssetsTable className='col-span-3' />
      </div>
    </div>
  )
}
