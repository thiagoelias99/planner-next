'use client'

import { Header1 } from '@/components/ui/typography'
import { format } from 'date-fns'
import BalanceCard from './_components/balance-card'
import CurrentAssetsCard from './_components/current-assets-card'
import AssetsTable from './_components/assets-table'
import AmountToShare from './_components/amount-to-share'
import useAssets from '@/hooks/assets/use-assets'

export default function Page() {
  const { getSummary } = useAssets()

  return (
    <div className='w-full max-w-screen-2xl mx-auto px-10 py-4'>
      <Header1>My assets portfolio in {format(new Date(), 'MMMM, d yyyy')}</Header1>
      {getSummary.isFetching ? (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
          <p className='text-3xl text-center -translate-y-20'>Calculating...</p>
        </div>
      ) : (
        <>
          <div className='w-full grid grid-cols-3 gap-4'>
            <BalanceCard className='col-span-2' />
            <CurrentAssetsCard />
            <AmountToShare className='col-span-3 justify-end' />
            <AssetsTable className='col-span-3' />
          </div>
        </>
      )}
    </div>
  )
}
