'use client'

import { Card } from '@/components/ui/card'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors, ChartData } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

export const GraphSection = () => {
  ChartJS.register(ArcElement, Tooltip, Legend, Colors)

  const data = {
    labels: [
      'Ações',
      'FIIs',
      'Internacional',
      'Cripto',
      'Ouro'
    ],
    datasets: [{
      label: 'Porcentagem',
      data: [300, 50, 100, 30, 40],
      hoverOffset: 4
    }]
  }

  return (
    <Card className='m-4 h-[359px] border-2 flex items-center justify-center'>
      <div>
        <Doughnut data={data}
          options={{
            plugins: {
              legend: {
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
