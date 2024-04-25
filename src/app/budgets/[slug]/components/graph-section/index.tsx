'use client'

import { Card } from '@/components/ui/card'
import { UserStock } from '@/models/user-stock'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors, ChartData } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

interface Props {
  incomes: number,
  expenses: number
}

export const GraphSection = ({ incomes, expenses }: Props) => {
  ChartJS.register(ArcElement, Tooltip, Legend, Colors)

  const labels = ['Renda', 'Despesa']

  const values = [
    incomes,
    expenses
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
