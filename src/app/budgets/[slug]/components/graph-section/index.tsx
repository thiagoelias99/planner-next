'use client'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { BudgetSummary } from '@/models/budget/budget-summary'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { ClassNameValue } from 'tailwind-merge'

interface Props {
  summary: BudgetSummary
  className?: ClassNameValue
  graphHeight?: number
}

export const GraphSection = ({ summary, className, graphHeight = 180 }: Props) => {
  ChartJS.register(ArcElement, Tooltip, Legend, Colors)

  const labels = ['Renda', 'Despesa', 'Investimento', 'Previdência']

  const values = [
    summary.actualIncomeValue,
    summary.actualOutcomeValue + summary.actualCreditValue + summary.actualCashBoxValue,
    summary.actualInvestmentsValue,
    summary.actualPensionValue
  ]

  const data = {
    labels,
    datasets: [{
      label: 'R$',
      data: values,
      hoverOffset: 1
    }]
  }

  return (
    <Card className={cn('m-4 p-4 border-2 flex items-center justify-center', className)}>
      <div className={`h-[${graphHeight}px]`}>
        <Doughnut data={data}
          options={{
            plugins: {
              legend: {
                display: false,
                position: 'right',
                align: 'end',
                fullSize: true,
                labels: {
                  color: 'white',
                  font: {
                    size: 16,
                    family: 'Roboto'
                  }
                }
              }
            }
          }}
        />
      </div>
    </Card>
  )
}