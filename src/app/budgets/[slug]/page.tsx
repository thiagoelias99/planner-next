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

  // const summary: BudgetSummary = {
  //   incomes: [
  //     {
  //       id: '1',
  //       parentId: '1',
  //       description: 'Salário',
  //       value: 19999.99,
  //       date: new Date(),
  //       isChecked: false,
  //       paymentMethod: BudgetPaymentMethodEnum.TRANSFER,
  //       deleted: false
  //     },
  //     {
  //       id: '2',
  //       parentId: '1',
  //       description: 'Salário',
  //       value: 19999.99,
  //       date: new Date(),
  //       isChecked: true,
  //       paymentMethod: BudgetPaymentMethodEnum.TRANSFER,
  //       deleted: false
  //     },
  //     {
  //       id: '3',
  //       parentId: '1',
  //       description: 'Salário',
  //       value: 19999.99,
  //       date: new Date(),
  //       isChecked: false,
  //       paymentMethod: BudgetPaymentMethodEnum.TRANSFER,
  //       deleted: false
  //     }
  //   ],
  //   outcomes: [
  //     {
  //       id: '1',
  //       parentId: '1',
  //       description: 'Aluguel',
  //       value: 2345.67,
  //       date: new Date(),
  //       isChecked: false,
  //       paymentMethod: BudgetPaymentMethodEnum.TRANSFER,
  //       deleted: false
  //     },
  //     {
  //       id: '2',
  //       parentId: '1',
  //       description: 'Aluguel',
  //       value: 2345.67,
  //       date: new Date(),
  //       isChecked: true,
  //       paymentMethod: BudgetPaymentMethodEnum.TRANSFER,
  //       deleted: false
  //     },
  //     {
  //       id: '3',
  //       parentId: '1',
  //       description: 'Aluguel',
  //       value: 2345.67,
  //       date: new Date(),
  //       isChecked: false,
  //       paymentMethod: BudgetPaymentMethodEnum.TRANSFER,
  //       deleted: false
  //     },
  //     {
  //       id: '4',
  //       parentId: '1',
  //       description: 'Aluguel',
  //       value: 2345.67,
  //       date: new Date(),
  //       isChecked: false,
  //       paymentMethod: BudgetPaymentMethodEnum.TRANSFER,
  //       deleted: false
  //     },
  //     {
  //       id: '5',
  //       parentId: '1',
  //       description: 'Aluguel',
  //       value: 2345.67,
  //       date: new Date(),
  //       isChecked: false,
  //       paymentMethod: BudgetPaymentMethodEnum.TRANSFER,
  //       deleted: false
  //     }
  //   ],
  //   predictedIncomeValue: 19999.99,
  //   predictedOutcomeValue: 2345.67,
  //   predictedBalance: 19999.99 - 2345.67,
  //   actualIncomeValue: 7689.43,
  //   actualOutcomeValue: 2645.77,
  //   actualBalance: 7689.43 - 2645.77
  // }

  return (
    <div className='pb-4'>
      {summary && (
        <>
          <GraphSection summary={summary} />
          <SummarySection summary={summary} />
          <IncomeAndExpenseSection summary={summary} className={'mt-4'} />
        </>
      )}
    </div>
  )
}
