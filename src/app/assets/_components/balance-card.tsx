'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Currency from '@/components/ui/currency'
import Percentage from '@/components/ui/percentage'
import useAssets from '@/hooks/assets/use-assets'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ClassNameValue } from 'tailwind-merge'
import {
  type ChartConfig,
} from '@/components/ui/chart'
import BalanceChart from './balance-chart'

interface Props {
  className?: ClassNameValue
}

export default function BalanceCard({ className }: Props) {
  const { getSummary } = useAssets()

  const chartData = [
    { month: format(new Date(getSummary.data?.lastMonthHistoric.date || new Date()), 'MMMM'), balance: getSummary.data?.lastMonthHistoric.generalTotalValue || 0 },
    { month: format(new Date(), 'MMMM'), balance: getSummary.data?.currentTotalValue || 0 },
  ]

  const chartConfig = {
    balance: {
      label: 'Balance',
      color: 'hsl(var(--foreground))',
    }
  } satisfies ChartConfig

  return (
    <Card className={cn(' px-6', className)}>
      <CardHeader>
        <div>
          <h2>Balance</h2>
          <Currency
            value={getSummary.data?.currentTotalValue || 0}
            className='text-3xl'
          />
        </div>
        <div>
          <Currency
            value={getSummary.data?.lastMonthHistoric.generalGainLosses || 0}
            colorize
          />
          <Percentage
            value={getSummary.data?.lastMonthHistoric.generalPercentage || 0}
            colorize
            useSignals
          />
        </div>
      </CardHeader>

      <CardContent>
        <BalanceChart
          chartData={chartData}
          chartConfig={chartConfig}
        />
      </CardContent>
    </Card>
  )
}
