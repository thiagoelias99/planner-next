'use client'

import ModuleBar from '@/components/module-bar'
import useAssets from '@/hooks/assets/use-assets'
import { formatCurrency } from '@/lib/format-currency'
import { formatPercentage } from '@/lib/format-percentage'
import { cn } from '@/lib/utils'
import { ArrowRightIcon, Loader2Icon } from 'lucide-react'
import NextLink from 'next/link'
import React, { useState } from 'react'
import { ClassNameValue } from 'tailwind-merge'
import EditCashBoxDialog from './my_stocks/_components/edit-cash-box-dialog'
import { CashBoxPension } from '@/models/assets/fixed-income'

export default function Assets() {
  const { getSummary } = useAssets()
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState<CashBoxPension | undefined>(undefined)

  return (
    <div className='py-4'>
      <ModuleBar title='Assets' className='px-4' />
      <section className='w-full p-4 flex flex-col gap-4 max-w-96 mx-auto'>
        <div className={cn('w-full bg-card rounded-lg p-4 flex flex-row justify-between items-center shadow-shape',)}>
          <div className="flex justify-start items-center gap-2">
            <h2 className='text-base font-semibold'>Total</h2>
          </div>
          {getSummary.isFetching ? (
            <Loader2Icon className='animate-spin' />
          ) : (
            <p className='text-lg font-bold'>{formatCurrency(getSummary.data?.currentTotalValue)}</p>
          )}
        </div>
        <div
          role='button'
          onClick={() => {
            setSelectedItem(getSummary.data?.fixedIncomes.share[0])
            setOpenDialog(true)
          }}
          className={cn('w-full bg-card rounded-lg p-4 flex flex-row justify-between items-center shadow-shape',)}
        >
          <div className="flex justify-start items-center gap-2">
            <h2 className='text-base font-semibold'>To share</h2>
          </div>
          {getSummary.isFetching ? (
            <Loader2Icon className='animate-spin' />
          ) : (
            <div className='flex justify-end items-center gap-4'>
              <p className='text-lg font-bold'>{formatCurrency(getSummary.data?.sharesTotalValue)} </p>
              <p className='text-lg font-bold'>{formatPercentage(getSummary.data && getSummary.data?.sharesPercentage / 100)}</p>
            </div>
          )}
        </div>
        <ul className='contents'>
          <AssetItem title='Cash Boxes' href='assets/my_stocks?init=cashbox' isLoading={getSummary.isFetching} value={getSummary.data?.cashBoxesTotalValue} percentage={getSummary.data && getSummary.data?.cashBoxesPercentage / 100} />
          <AssetItem title='Fixed Incomes' href='assets/my_stocks?init=fixed' isLoading={getSummary.isFetching} value={getSummary.data?.fixedIncomesTotalValue} percentage={getSummary.data && getSummary.data?.fixedIncomesPercentage / 100} />
          <AssetItem title='Stocks' isLoading={getSummary.isFetching} value={getSummary.data?.stocksTotalValue || 0} href='assets/my_stocks?init=stocks' percentage={getSummary.data && getSummary.data?.stocksPercentage / 100} />
          <AssetItem title='REITs' isLoading={getSummary.isFetching} value={getSummary.data?.reitsTotalValue || 0} href='assets/my_stocks?init=reits' percentage={getSummary.data && getSummary.data?.reitsPercentage / 100} />
          <AssetItem title='Internationals' isLoading={getSummary.isFetching} value={getSummary.data?.internationalsTotalValue || 0} href='assets/my_stocks?init=internationals' percentage={getSummary.data && getSummary.data?.internationalsPercentage / 100} />
          <AssetItem title='Golds' isLoading={getSummary.isFetching} value={getSummary.data?.goldsTotalValue || 0} href='assets/my_stocks?init=golds' percentage={getSummary.data && getSummary.data?.goldsPercentage / 100} />
          <AssetItem title='Cryptos' isLoading={getSummary.isFetching} value={getSummary.data?.cryptosTotalValue || 0} href='assets/my_stocks?init=cryptos' percentage={getSummary.data && getSummary.data?.cryptosPercentage / 100} />
          <AssetItem title='Pensions' href='assets/my_stocks?init=pension' isLoading={getSummary.isFetching} value={getSummary.data?.pensionsTotalValue} percentage={getSummary.data && getSummary.data?.pensionsPercentage / 100} />
          <AssetItem title='Properties' href='assets/my_stocks?init=properties' isLoading={getSummary.isFetching} value={getSummary.data?.propertiesTotalValue} percentage={getSummary.data && getSummary.data?.propertiesPercentage / 100} />
        </ul>
      </section>
      <EditCashBoxDialog
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        hiddenTrigger
      />
    </div>
  )
}

interface AssetItemProps {
  title: string
  value?: number
  percentage?: number
  href: string
  isLoading?: boolean
  className?: ClassNameValue
}

function AssetItem({ title, href, value, className, isLoading = false, percentage = 0 }: AssetItemProps) {
  return (
    <li>
      <NextLink href={href} className={cn('w-full bg-card rounded-lg p-4 flex flex-row justify-between items-center shadow-shape', className)}>
        <div className="flex justify-start items-center gap-2">
          <h2 className='text-base font-semibold'>{title}</h2>
          <ArrowRightIcon size={16} />
        </div>
        {isLoading ? (
          <Loader2Icon className='animate-spin' />
        ) : (
          <div className='flex justify-end items-center gap-4'>
            <p className='text-lg font-bold'>{formatCurrency(value)} </p>
            <p className='text-lg font-bold'>{formatPercentage(percentage)}</p>
          </div>
        )}
      </NextLink>
    </li>
  )
}
