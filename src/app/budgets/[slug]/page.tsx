'use client'

import useToken from '@/hooks/use-token'
import { useRouter } from 'next/navigation'

import React, { useEffect } from 'react'
import { GraphSection } from './components/graph-section'
import SummarySection from './components/summary-section'
import IncomeAndExpenseSection from './components/income-expense-section'
import FloatingActionButton from '@/components/ui/floating-action-button'
import useBudgetSummaryFromMonth from '@/hooks/budgets/use-budget-summary-for-month'

interface Props {
  params: {
    slug: string
  }
}

export default function MonthSummary({ params }: Props) {
  // Token is required to access this page
  const { token } = useToken()
  const router = useRouter()
  const [year, month] = params.slug.split('-').map((value) => parseInt(value))

  const { getSummary, checkItem } = useBudgetSummaryFromMonth(month, year)

  const summary = getSummary.data

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
  }, [token])

  function handleFABClick() {
    alert('FAB clicked')
  }

  function checkBoxHandler(parentId: string, id: string, checked: boolean) {
    checkItem.mutate({
      parentId,
      id,
      checked
    })
  }

  return (
    <div className='pb-4'>
      {summary && (
        <div>
          <GraphSection summary={summary} />
          <SummarySection summary={summary} />
          <IncomeAndExpenseSection
            className={'mt-4'}
            summary={summary}
            checkBoxHandler={checkBoxHandler}
          />
          <FloatingActionButton onClick={handleFABClick} />
        </div>
      )}
    </div>
  )
}
