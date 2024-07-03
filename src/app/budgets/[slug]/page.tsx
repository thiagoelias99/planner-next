'use client'

import useToken from '@/hooks/use-token'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import { GraphSection } from './components/graph-section'
import SummarySection from './components/summary-section'
import IncomeAndExpenseSection from './components/income-expense-section'
import useBudgetSummaryFromMonth from '@/hooks/budgets/use-budget-summary-for-month'
import CreateBudgetDialog from './components/create-budget-dialog'
import UpdateBudgetDialog from './components/update-budget-dialog'
import { Budget } from '@/models/budget/budget'
import ModuleBar, { ModuleLink } from '@/components/module-bar'
import { PlusIcon } from 'lucide-react'

interface Props {
  params: {
    slug: string
  }
}

export default function MonthSummary({ params }: Props) {
  // Token is required to access this page
  const { token } = useToken()
  const router = useRouter()
  const [openCreateDialog, setOpenCreateDialog] = useState(false)
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
  const [showDeleted, setShowDeleted] = useState(false)
  const [year, month] = params.slug.split('-').map((value) => parseInt(value))
  const [focusedItem, setFocusedItem] = useState<Budget>()

  const { getSummary, checkItem, createBudget, updateBudget, deleteBudget, restoreBudget } = useBudgetSummaryFromMonth(month, year)

  const summary = getSummary.data

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  function handleFABClick() {
    setOpenCreateDialog(true)
  }

  function checkBoxHandler(parentId: string, id: string, checked: boolean) {
    checkItem.mutate({
      parentId,
      id,
      checked
    })
  }

  function onBudgetItemTouchHandler(parentId: string, id: string) {
    const item =
      summary?.incomes.find((item) => item.transactions[0].id === id) ||
      summary?.outcomes.find((item) => item.transactions[0].id === id) ||
      summary?.creditCards.find((item) => item.transactions[0].id === id) ||
      summary?.pensions.find((item) => item.transactions[0].id === id) ||
      summary?.investments.find((item) => item.transactions[0].id === id) ||
      summary?.cashBoxes.find((item) => item.transactions[0].id === id)

    if (item) {
      setFocusedItem(item)
      setOpenUpdateDialog(true)
    }
  }

  const moduleBarLinks: ModuleLink[] = [
    {
      Icon: PlusIcon,
      onClick: handleFABClick,
      variant: 'default'
    }
  ]

  return (
    <div className='pb-4'>
      {summary && (
        <div className='h-full max-w-[1539px] m-auto'>
          <ModuleBar
            title={new Date(year, month, 10).toLocaleString('default', { month: 'long', year: 'numeric' })}
            links={moduleBarLinks}
            backFunction={() => router.push('/budgets')}
            className='px-4 pt-4'
            reverse
          />
          <div className='w-full flex flex-col pt-4 sm:flex-row justify-center items-center sm:justify-start sm:items-start'>
            <div className='w-full sm:h-[75vh] flex flex-col sm:flex-col-reverse sm:justify-start'>
              <GraphSection summary={summary} className='h-full flex-1 mx-4' />
              <SummarySection actualBalance={summary.actualBalance} className='mx-4 mt-4' />
            </div>
            <div className='w-full sm:h-[75vh] sm:pb-4 flex flex-col sm:justify-start sm:items-start'>
              <IncomeAndExpenseSection
                showDeleted={showDeleted}
                className={'w-full mt-4 sm:mt-0'}
                summary={summary}
                checkBoxHandler={checkBoxHandler}
                onItemTouchHandler={onBudgetItemTouchHandler}
              />
            </div>
          </div>
        </div>
      )}
      <CreateBudgetDialog
        open={openCreateDialog}
        onOpenChange={setOpenCreateDialog}
        createFunction={createBudget.mutate}
        isSuccess={createBudget.isSuccess}
        isLoading={createBudget.isLoading}
      />
      <UpdateBudgetDialog
        open={openUpdateDialog}
        onOpenChange={setOpenUpdateDialog}
        budget={focusedItem}
        updateFunction={updateBudget.mutate}
        deleteFunction={deleteBudget.mutate}
        restoreFunction={restoreBudget.mutate}
        isSuccess={updateBudget.isSuccess}
      />
    </div>
  )
}