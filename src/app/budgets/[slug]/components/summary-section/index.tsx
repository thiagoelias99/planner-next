import { Header1 } from '@/components/ui/typography'
import React from 'react'
import { BudgetSummary } from '@/models/budget/budget-summary'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/format-currency'

interface Props {
  actualBalance: number
  className?: ClassNameValue
}

export default function SummarySection({ actualBalance, className }: Props) {
  return (
    <section className={cn('flex justify-between items-center bg-card text-card-foreground px-2 py-4 rounded-lg', className)}>
      <Header1>Saldo</Header1>
      <p className='text-lg font-bold'>{formatCurrency(actualBalance)}</p>
    </section>
  )
}
