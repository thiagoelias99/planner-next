import ModuleBar from '@/components/module-bar'
import { formatCurrency } from '@/lib/format-currency'
import { cn } from '@/lib/utils'
import { ArrowRightIcon } from 'lucide-react'
import NextLink from 'next/link'
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'

export default function Assets() {
  return (
    <div className='py-4'>
      <ModuleBar title='Assets' className='px-4' />
      <section>
        <NextLink href='/assets/orders'>
          <h1>Orders</h1>
        </NextLink>
      </section>
      <section className='w-full p-4 flex flex-col gap-4'>
        <ul className='contents'>
          <AssetItem title='Stocks' value={0} href='assets/my_stocks' />
        </ul>
        <ul className='contents'>
          <AssetItem title='GEneral Stocks' value={0} href='assets/stocks' />
        </ul>
      </section>
    </div>
  )
}

interface AssetItemProps {
  title: string
  value: number
  href: string
  className?: ClassNameValue
}

function AssetItem({ title, href, value, className }: AssetItemProps) {
  return (
    <li>
      <NextLink href={href} className={cn('w-full bg-card rounded-lg p-4 flex flex-row justify-between items-center', className)}>
        <div className="flex justify-start items-center gap-2">
          <h2 className='text-base font-semibold'>{title}</h2>
          <ArrowRightIcon size={16} />
        </div>
        <p className='text-lg font-bold'>{formatCurrency(value)}</p>
      </NextLink>
    </li>
  )
}
