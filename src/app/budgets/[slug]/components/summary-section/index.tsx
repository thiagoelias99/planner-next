import { Header1 } from '@/components/ui/typography'
import React from 'react'
import SummaryCard from './summary-card'
import { BudgetSummary } from '@/models/budget/budget-summary'

interface Props {
  summary: BudgetSummary
}

export default function SummarySection({ summary }: Props) {
  return (
    <section className='px-4'>
      <Header1>Sumário</Header1>
      <div className='w-full mt-2 flex flex-row flex-wrap justify-center items-center gap-2'>
        <SummaryCard title='Renda' value={summary.actualIncomeValue} previewValue={summary.predictedIncomeValue} />
        <SummaryCard title='Despesa' value={summary.actualOutcomeValue + summary.actualCreditValue + summary.actualCashBoxValue} previewValue={summary.predictedOutcomeValue} />
        <SummaryCard title='Investimentos' value={summary.actualInvestmentsValue} previewValue={summary.predictedInvestmentsValue} />
        <SummaryCard title='Previdência' value={summary.actualPensionValue} previewValue={summary.predictedPensionValue} />
        <SummaryCard title='Saldo' value={summary.actualBalance} previewValue={summary.predictedBalance} />
      </div>
    </section>
  )
}
