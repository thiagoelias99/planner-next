'use client'

import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import NextLink from 'next/link'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { getDate, getMonth, getYear, isPast } from 'date-fns'
import { Budget } from '@/models/budget/budget'
import useBudgetSummaryFromMonth from '@/hooks/budgets/use-budget-summary-for-month'
import { useEffect, useState } from 'react'
import BudgetItem from '../budgets/[slug]/components/income-expense-section/budget-item'
import CreateBudgetDialog from '../budgets/[slug]/components/edit-dialog'

interface Props {
  className?: ClassNameValue
}

export default function BudgetsSection({ className }: Props) {
  const month = getMonth(new Date())
  const year = getYear(new Date())

  const { getSummary, checkItem, createBudget, deleteBudget, restoreBudget, updateBudget } = useBudgetSummaryFromMonth(month, year)
  const [items, setItems] = useState<Budget[]>([])
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Budget | undefined>(undefined)

  useEffect(() => {
    if (getSummary.data) {
      const items: Budget[] = []
      items.push(...filterBudgets(getSummary.data.incomes))
      items.push(...filterBudgets(getSummary.data.outcomes))
      items.push(...filterBudgets(getSummary.data.cashBoxes))
      items.push(...filterBudgets(getSummary.data.creditCards))
      items.push(...filterBudgets(getSummary.data.investments))
      items.push(...filterBudgets(getSummary.data.pensions))

      items.sort((a, b) => b.transactions[0].value - a.transactions[0].value)

      setItems(items)
    }
  }, [getSummary.data])

  /*
  * Filter budgets that expected to be checked today and budgets that have not been checked in the past
  */
  function filterBudgets(budgets: Budget[]): Budget[] {
    // return budgets.filter((budget => (budget.expectedMonthDay === getDate(new Date()) || !budget.transactions[0].checked)))
    return budgets.filter((budget => (budget.expectedMonthDay === getDate(new Date()) || (!budget.transactions[0].checked) && isPast(new Date(budget.transactions[0].date)))))
  }

  function checkBoxHandler(parentId: string, id: string, checked: boolean) {
    checkItem.mutate({
      parentId,
      id,
      checked
    })
  }

  return (
    <section className={cn('', className)}>
      <Card>
        <CardHeader className='pt-0'>
          <NextLink href={`/budgets/${year}-${month}`}>
            <CardTitle>Budgets</CardTitle>
          </NextLink>
          <Button size='icon' onClick={() => {
            setSelectedItem(undefined)
            setOpenEditDialog(true)
          }}>
            <PlusIcon />
          </Button>
        </CardHeader>
        <CardContent className='space-y-2'>
          {items.map(budget => (
            <BudgetItem
              key={budget.id}
              data={budget}
              onTouchHandler={() => {
                setSelectedItem(budget)
                setOpenEditDialog(true)
              }}
              checkBoxHandler={checkBoxHandler}
            />
          ))}
        </CardContent>
      </Card>
      <CreateBudgetDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        selectedBudget={selectedItem}
        createFunction={createBudget.mutate}
        updateFunction={updateBudget.mutate}
        deleteFunction={deleteBudget.mutate}
        restoreFunction={restoreBudget.mutate}
        isLoading={createBudget.isLoading}
      />
    </section>
  )
}
