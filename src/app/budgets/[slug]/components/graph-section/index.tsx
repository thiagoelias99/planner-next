'use client'

import { Card } from '@/components/ui/card'
import { BudgetSummary } from '@/models/budget/budget-summary'
import { UserStock } from '@/models/user-stock'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors, ChartData } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

interface Props {
  summary: BudgetSummary
}

export const GraphSection = ({ summary }: Props) => {
  ChartJS.register(ArcElement, Tooltip, Legend, Colors)

  const labels = ['Renda', 'Despesa']

  const values = [
    summary.actualIncomeValue,
    summary.actualOutcomeValue
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
    <Card className='m-4 h-[359px] border-2 flex items-center justify-center'>
      <div>
        <Doughnut data={data}
          options={{
            plugins: {
              legend: {
                display: false,
                position: 'bottom',
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
