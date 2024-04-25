import React from 'react'
import { GraphSection } from './components/graph-section'
import SummarySection from './components/summary-section'
import { BudgetSummary } from '@/models/budget/budget-summary'

interface Props {
  params: {
    slug?: string
  }
}

export default function MonthSummary({ params }: Props) {
  if (!params.slug) {
    //TODO: redirect to 404
    return (
      <div>404</div>
    )
  }

  const summary: BudgetSummary = {
    incomes: [],
    outcomes: [],
    predictedIncomeValue: 19999.99,
    predictedOutcomeValue: 2345.67,
    predictedBalance: 19999.99 - 2345.67,
    actualIncomeValue: 7689.43,
    actualOutcomeValue: 2645.77,
    actualBalance: 7689.43 - 2645.77
  }

  return (
    <div>
      <GraphSection summary={summary} />
      <SummarySection summary={summary} />
    </div>
  )
}
