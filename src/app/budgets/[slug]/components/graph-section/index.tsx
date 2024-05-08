'use client'

import { Card } from '@/components/ui/card'
import { BudgetSummary } from '@/models/budget/budget-summary'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js'
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
    <Card className='m-4 p-4 border-2 flex items-center justify-center'>
      <div className='h-[180px]'>
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
