import { Header1 } from '@/components/ui/typography'
import { BudgetSummary } from '@/models/budget/budget-summary'
import React from 'react'
import BudgetItem from './budget-item'
import { ClassNameValue } from 'tailwind-merge'
import { BudgetSimplified } from '@/models/budget/budget-simplified'
import { cn } from '@/lib/utils'

interface Props {
  className?: ClassNameValue
  summary: BudgetSummary
  checkBoxHandler: (parentId: string, id: string, checked: boolean) => void
  onItemTouchHandler: (parentId: string, id: string) => void
}

export default function IncomeAndExpenseSection({ summary, className, checkBoxHandler, onItemTouchHandler }: Props) {
  return (
    <section className={`px-4 ${className} grid gap-4 sm:grid-cols-2`}>
      <Item
        title='Rendas'
        items={summary.incomes}
        checkBoxHandler={checkBoxHandler}
        onItemTouchHandler={onItemTouchHandler}
      />
      <Item
        title='Despesas'
        items={summary.outcomes}
        checkBoxHandler={checkBoxHandler}
        onItemTouchHandler={onItemTouchHandler}
      />
      <Item
        title='Cartão de Crédito'
        items={summary.creditCards}
        checkBoxHandler={checkBoxHandler}
        onItemTouchHandler={onItemTouchHandler}
      />
      <Item
        title='Investimentos'
        items={summary.investments}
        checkBoxHandler={checkBoxHandler}
        onItemTouchHandler={onItemTouchHandler}
      />
      <Item
        title='Aposentadoria'
        items={summary.pensions}
        checkBoxHandler={checkBoxHandler}
        onItemTouchHandler={onItemTouchHandler}
      />
      <Item
        title='Cofre'
        items={summary.cashBoxes}
        checkBoxHandler={checkBoxHandler}
        onItemTouchHandler={onItemTouchHandler}
      />
    </section>
  )
}

interface ItemProps {
  className?: ClassNameValue
  title: string
  items: BudgetSimplified[]
  checkBoxHandler: (parentId: string, id: string, checked: boolean) => void
  onItemTouchHandler: (parentId: string, id: string) => void
}

function Item({ items, checkBoxHandler, onItemTouchHandler, className, title }: ItemProps) {
  const nonDeletedItems = items.filter((item) => !item.deleted)

  return (
    <div className={cn(`${nonDeletedItems.length === 0 ? 'hidden' : ''}`, className)}>
      <Header1>{title}</Header1>
      <div className='mt-2 flex flex-col justify-start items-start gap-2'>
        {items.map((item) => (
          <BudgetItem
            key={item.id}
            data={item}
            checkBoxHandler={checkBoxHandler}
            onTouchHandler={onItemTouchHandler}
          />
        ))}
      </div>
    </div>
  )
}