import { Header1 } from '@/components/ui/typography'
import { BudgetSummary } from '@/models/budget/budget-summary'
import React from 'react'
import BudgetItem from './budget-item'
import { ClassNameValue } from 'tailwind-merge'
import { BudgetSimplified } from '@/models/budget/budget-simplified'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Props {
  summary: BudgetSummary
  checkBoxHandler: (parentId: string, id: string, checked: boolean) => void
  onItemTouchHandler: (parentId: string, id: string) => void
  className?: ClassNameValue
  showDeleted: boolean
}

export default function IncomeAndExpenseSection({ summary, className, checkBoxHandler, onItemTouchHandler, showDeleted }: Props) {
  return (
    <ScrollArea className='w-full sm:h-[75vh]'>
      <section className={`px-4 ${className} grid gap-4 lg:grid-cols-2`}>
        <Item
          title='Rendas'
          items={summary.incomes}
          checkBoxHandler={checkBoxHandler}
          onItemTouchHandler={onItemTouchHandler}
          showDeleted={showDeleted}
        />
        <Item
          title='Despesas'
          items={summary.outcomes}
          checkBoxHandler={checkBoxHandler}
          onItemTouchHandler={onItemTouchHandler}
          showDeleted={showDeleted}
        />
        <Item
          title='Cartão de Crédito'
          items={summary.creditCards}
          checkBoxHandler={checkBoxHandler}
          onItemTouchHandler={onItemTouchHandler}
          showDeleted={showDeleted}
        />
        <Item
          title='Investimentos'
          items={summary.investments}
          checkBoxHandler={checkBoxHandler}
          onItemTouchHandler={onItemTouchHandler}
          showDeleted={showDeleted}
        />
        <Item
          title='Aposentadoria'
          items={summary.pensions}
          checkBoxHandler={checkBoxHandler}
          onItemTouchHandler={onItemTouchHandler}
          showDeleted={showDeleted}
        />
        <Item
          title='Cofre'
          items={summary.cashBoxes}
          checkBoxHandler={checkBoxHandler}
          onItemTouchHandler={onItemTouchHandler}
          showDeleted={showDeleted}
        />
      </section>
    </ScrollArea>
  )
}

interface ItemProps {
  title: string
  items: BudgetSimplified[]
  checkBoxHandler: (parentId: string, id: string, checked: boolean) => void
  onItemTouchHandler: (parentId: string, id: string) => void
  showDeleted: boolean
  className?: ClassNameValue
}

function Item({ items, checkBoxHandler, onItemTouchHandler, className, title, showDeleted }: ItemProps) {
  const itemsToShow = showDeleted ? items : items.filter((item) => !item.deleted)
  return (
    <div className={cn(`${itemsToShow.length === 0 ? 'hidden' : ''}`, className)}>
      <Header1>{title}</Header1>
      <div className='mt-2 flex flex-col justify-start items-start gap-2'>
        {itemsToShow.map((item) => (
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