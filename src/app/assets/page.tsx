'use client'

import ModuleBar from '@/components/module-bar'
import { Card } from '@/components/ui/card'
import useAssets from '@/hooks/assets/use-assets'
import useStocks from '@/hooks/assets/use-stocks'
import { formatCurrency } from '@/lib/format-currency'
import { cn } from '@/lib/utils'
import { ArrowRightIcon, Loader2Icon } from 'lucide-react'
import NextLink from 'next/link'
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'

export default function Assets() {
  const { getSummary } = useAssets()

  return (
    <div className='py-4'>
      <ModuleBar title='Assets' className='px-4' />
      <section>
        <NextLink href='/assets/orders'>
          <Card className='rounded-lg p-4 mx-4 mt-4'>
            <h2 className='text-base font-semibold'>My Orders</h2>
          </Card>
        </NextLink>
      </section>
      <section className='w-full p-4 flex flex-col gap-4'>
        <ul className='contents'>
          <AssetItem title='Stocks' isLoading={getSummary.isFetching} value={getSummary.data?.stocksTotalValue || 0} href='assets/my_stocks?init=stocks' />
          <AssetItem title='REITs' isLoading={getSummary.isFetching} value={getSummary.data?.reitsTotalValue || 0} href='assets/my_stocks?init=reits' />
          <AssetItem title='Internationals' isLoading={getSummary.isFetching} value={getSummary.data?.internationalsTotalValue || 0} href='assets/my_stocks?init=internationals' />
          <AssetItem title='Golds' isLoading={getSummary.isFetching} value={getSummary.data?.goldsTotalValue || 0} href='assets/my_stocks?init=golds' />
          <AssetItem title='Cryptos' isLoading={getSummary.isFetching} value={getSummary.data?.cryptosTotalValue || 0} href='assets/my_stocks?init=cryptos' />
          <AssetItem title='GEneral Stocks' href='assets/stocks' />
        </ul>
      </section>
    </div>
  )
}

interface AssetItemProps {
  title: string
  value?: number
  href: string
  isLoading?: boolean
  className?: ClassNameValue
}

function AssetItem({ title, href, value, className, isLoading = false }: AssetItemProps) {
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
          { value } && <p className='text-lg font-bold'>{formatCurrency(value)}</p>
        )}
      </NextLink>
    </li>
  )
}
