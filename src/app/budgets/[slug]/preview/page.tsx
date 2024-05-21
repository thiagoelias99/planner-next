'use client'

import { DollarSignIcon, DiamondPercentIcon } from 'lucide-react'
import PreviewCard from './components/preview-card'
import useBudgetSummaryFromMonth from '@/hooks/budgets/use-budget-summary-for-month'

interface Props {
  params: {
    slug: string
  }
}

export default function MonthPreview({ params }: Props) {
  const [year, month] = params.slug.split('-').map((value) => parseInt(value))
  const { getSummary } = useBudgetSummaryFromMonth(month, year)

  const summary = getSummary.data

  return (
    <div className='w-full p-4 grid grid-flow-row sm:grid-flow-col sm:grid-cols-4 gap-4'>
      <PreviewCard
        title='Renda'
        Icon={DollarSignIcon}
        subTitles={[
          { title: 'Atual', value: summary?.actualIncomeValue || 0 },
          { title: 'Previsto', value: summary?.predictedIncomeValue || 0 }
        ]}
      />
      <PreviewCard
        title='Despesas'
        Icon={DiamondPercentIcon}
        subTitles={[
          { title: 'Atual', value: summary?.actualOutcomeValue || 0 },
          { title: 'Previsto', value: summary?.predictedOutcomeValue || 0 }
        ]}
      />
    </div>
  )
}