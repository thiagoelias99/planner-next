'use client'

import NextLink from 'next/link'

import { Button } from '@/components/ui/button'

export default function Budgets() {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  return (
    <div className='flex flex-col gap-4'>
      <section className='w-full p-4 flex flex-col'>
        <NextLink
          href={`/budgets/${currentYear}-${currentMonth}`}
          className='w-full'
        >
          <Button
            className='w-full'
          >Abrir mês atual</Button>
        </NextLink>
      </section>
    </div>
  )
}