'use client'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { UserStock } from '@/models/user-stock'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors, ChartData } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { ClassNameValue } from 'tailwind-merge'

interface Props {
  userStockData: UserStock
  className?: ClassNameValue
}

export const GraphSection = ({ userStockData, className }: Props) => {
  ChartJS.register(ArcElement, Tooltip, Legend, Colors)

  const labels = ['Ações', 'FIIs', 'Internacionais', 'Criptomoedas', 'Ouro']

  const values = [
    userStockData.stocks.percentage,
    userStockData.reits.percentage,
    userStockData.internationals.percentage,
    userStockData.cryptos.percentage,
    userStockData.gold.percentage
  ]

  const data = {
    labels,
    datasets: [{
      label: '%',
      data: values,
      hoverOffset: 1
    }]
  }

  return (
    <Card className={cn('max-w-[1539px] mx-4 sm:mx-auto sm:w-full h-[359px] border-2 flex items-center justify-center', className)}>
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
