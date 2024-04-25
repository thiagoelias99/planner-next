import { Header1 } from '@/components/ui/typography'
import { BudgetSummary } from '@/models/budget/budget-summary'
import React from 'react'
import BudgetItem from './budget-item'
import { ClassNameValue } from 'tailwind-merge'

interface Props {
  className?: ClassNameValue
  summary: BudgetSummary
}

export default function IncomeAndExpenseSection({ summary, className }: Props) {
  return (
    <section className={`px-4 ${className}`}>
      <div>
        <Header1>Rendas</Header1>
        <div className='mt-2 flex flex-col justify-start items-start gap-2'>
          {summary.incomes.map((item) => (
            <BudgetItem key={item.id} data={item} />
          ))}
        </div>
      </div>
      <div className='mt-4'>
        <Header1>Despesas</Header1>
        <div className='mt-2 flex flex-col justify-start items-start gap-2'>
          {summary.outcomes.map((item) => (
            <BudgetItem key={item.id} data={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
