'use client'

import useToken from '@/hooks/use-token'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import { GraphSection } from './components/graph-section'
import SummarySection from './components/summary-section'
import { BudgetSummary } from '@/models/budget/budget-summary'
import IncomeAndExpenseSection from './components/income-expense-section'
import { BudgetPaymentMethodEnum } from '@/models/budget/budget-payment-method.enum'
import { useBudgets } from '@/hooks/use-budgets'
import FloatingActionButton from '@/components/ui/floating-action-button'

interface Props {
  params: {
    slug: string
  }
}

export default function MonthSummary({ params }: Props) {
  // Token is required to access this page
  const { token } = useToken()
  const router = useRouter()
  const [summary, setSummary] = useState<BudgetSummary>()

  const { getSummaryFromYearAndMonth } = useBudgets()

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
    getSummaryFromYearAndMonth(year, month)
      .then((response) => {
        setSummary(response)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const [year, month] = params.slug.split('-').map((value) => parseInt(value))

  function handleFABClick() {
    alert('FAB clicked')
  }

  return (
    <div className='pb-4'>
      {summary && (
        <div>
          <GraphSection summary={summary} />
          <SummarySection summary={summary} />
          <IncomeAndExpenseSection summary={summary} className={'mt-4'} />
          <FloatingActionButton onClick={handleFABClick} />
        </div>
      )}
    </div>
  )
}
