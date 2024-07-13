import { Header1 } from '@/components/ui/typography'
import { BudgetSummary } from '@/models/budget/budget-summary'
import React from 'react'
import BudgetItem from './budget-item'
import { ClassNameValue } from 'tailwind-merge'
import { Budget } from '@/models/budget/budget'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatCurrency } from '@/lib/format-currency'
import { Card } from '@/components/ui/card'

interface Props {
  summary: BudgetSummary
  checkBoxHandler: (parentId: string, id: string, checked: boolean) => void
  onItemTouchHandler: (parentId: string, id: string) => void
  className?: ClassNameValue
  showDeleted: boolean
}

export default function IncomeAndExpenseSection({ summary, className, checkBoxHandler, onItemTouchHandler, showDeleted }: Props) {
  return (
    <section className={`w-full lg:w-2/3 px-4 flex flex-col lg:flex-row lg:flex-wrap justify-start items-start gap-4 ${className}`}>
      <Item
        title='Rendas'
        actualBalance={summary.actualIncomeValue}
        predictedBalance={summary.predictedIncomeValue}
        items={summary.incomes}
        checkBoxHandler={checkBoxHandler}
        onItemTouchHandler={onItemTouchHandler}
        showDeleted={showDeleted}
      />
      <Item
        title='Despesas'
        actualBalance={summary.actualOutcomeValue}
        predictedBalance={summary.predictedOutcomeValue}
        items={summary.outcomes}
        checkBoxHandler={checkBoxHandler}
        onItemTouchHandler={onItemTouchHandler}
        showDeleted={showDeleted}
      />
      <Item
        title='Cartão de Crédito'
        actualBalance={summary.actualCreditValue}
        predictedBalance={summary.creditLimitValue}
        items={summary.creditCards}
        checkBoxHandler={checkBoxHandler}
        onItemTouchHandler={onItemTouchHandler}
        showDeleted={showDeleted}
      />
      <Item
        title='Investimentos'
        actualBalance={summary.actualInvestmentsValue}
        predictedBalance={summary.predictedInvestmentsValue}
        items={summary.investments}
        checkBoxHandler={checkBoxHandler}
        onItemTouchHandler={onItemTouchHandler}
        showDeleted={showDeleted}
      />
      <Item
        title='Aposentadoria'
        actualBalance={summary.actualPensionValue}
        predictedBalance={summary.predictedPensionValue}
        items={summary.pensions}
        checkBoxHandler={checkBoxHandler}
        onItemTouchHandler={onItemTouchHandler}
        showDeleted={showDeleted}
      />
      <Item
        title='Cofre'
        actualBalance={summary.actualCashBoxValue}
        predictedBalance={summary.predictedCashBoxValue}
        items={summary.cashBoxes}
        checkBoxHandler={checkBoxHandler}
        onItemTouchHandler={onItemTouchHandler}
        showDeleted={showDeleted}
      />
    </section>
  )
}

interface ItemProps {
  title: string
  actualBalance: number
  predictedBalance: number
  items: Budget[]
  checkBoxHandler: (parentId: string, id: string, checked: boolean) => void
  onItemTouchHandler: (parentId: string, id: string) => void
  showDeleted: boolean
  className?: ClassNameValue
}

function Item({ items, checkBoxHandler, onItemTouchHandler, className, title, showDeleted, actualBalance, predictedBalance }: ItemProps) {
  const itemsToShow = showDeleted ? items : items.filter((item) => !item.transactions[0].deleted).sort((a, b) => b.transactions[0].value - a.transactions[0].value)

  return (
    <Card className={cn('w-full lg:w-[49%] px-2 pt-4 pb-2', className)}>
      <div className='flex justify-between items-center'>
        <Header1>{title}</Header1>
        <div className='flex justify-end items-end gap-2'>
          <p className='text-xs font-normal text-muted-foreground'>{`(${formatCurrency(predictedBalance)})`}</p>
          <p className='text-lg font-bold'>{formatCurrency(actualBalance)}</p>
        </div>
      </div>
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
    </Card>
  )
}