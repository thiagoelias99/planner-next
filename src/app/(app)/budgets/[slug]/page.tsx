'use client'

import useToken from '@/hooks/use-token'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import { GraphSection } from './components/graph-section'
import SummarySection from './components/summary-section'
import IncomeAndExpenseSection from './components/income-expense-section'
import useBudgetSummaryFromMonth from '@/hooks/budgets/use-budget-summary-for-month'
import CreateBudgetDialog from './components/edit-dialog'
import { Budget } from '@/models/budget/budget'
import ModuleBar from '@/components/module-bar'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SettingPopover } from './components/settings-popover'

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
  const [showDeleted, setShowDeleted] = useState(false)
  const [year, month] = params.slug.split('-').map((value) => parseInt(value))
  const [focusedItem, setFocusedItem] = useState<Budget | undefined>(undefined)

  const { getSummary, checkItem, createBudget, updateBudget, deleteBudget, restoreBudget } = useBudgetSummaryFromMonth(month, year)

  const summary = getSummary.data

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  function handleFABClick() {
    setFocusedItem(undefined)
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
      setOpenCreateDialog(true)
    }
  }

  return (
    <div className='pb-4'>
      {summary && (
        <div className='h-full max-w-[1539px] m-auto'>
          <ModuleBar
            title={new Date(year, month, 10).toLocaleString('default', { month: 'long', year: 'numeric' })}
            backHref='/budgets'
            className='px-4 pt-4'
          >
            <div className='flex justify-end items-start gap-2'>
              <Button
                onClick={handleFABClick}
                variant='default'
                size='icon'
              >
                <PlusIcon />
              </Button>
              <SettingPopover
                showDeleted={showDeleted}
                setShowDeleted={setShowDeleted}
              />
            </div>
          </ModuleBar>
          <div className='w-full flex flex-col pt-4 justify-center items-center'>
            <div className='w-full flex flex-col sm:flex-row'>
              <div className='w-full max-h-[80svh] lg:w-1/3 flex flex-col px-4 gap-4 sm:pr-0 sm:flex-col-reverse'>
                <GraphSection
                  summary={summary}
                  className='h-full flex-1'
                />
                <SummarySection
                  actualBalance={summary.actualBalance}
                  className=''
                />
              </div>
              <IncomeAndExpenseSection
                showDeleted={showDeleted}
                summary={summary}
                checkBoxHandler={checkBoxHandler}
                onItemTouchHandler={onBudgetItemTouchHandler}
                className={'mt-4 sm:mt-0 sm:max-h-[80svh] lg:flex-1 overflow-y-scroll [&::-webkit-scrollbar]:hidden'}
              />
            </div>
          </div>
        </div>
      )}
      <CreateBudgetDialog
        open={openCreateDialog}
        onOpenChange={setOpenCreateDialog}
        selectedBudget={focusedItem}
        createFunction={createBudget.mutate}
        updateFunction={updateBudget.mutate}
        deleteFunction={deleteBudget.mutate}
        restoreFunction={restoreBudget.mutate}
        isLoading={createBudget.isLoading}
      />
    </div>
  )
}