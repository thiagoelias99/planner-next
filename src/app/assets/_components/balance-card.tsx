'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
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
import { formatCurrency } from '@/lib/format-currency'
import InvestedInputDialog from './invested-input-dialog'

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
    <Card className={cn('px-4 h-full w-full flex flex-col', className)}>
      <CardHeader>
        <div>
          <h2>Balance</h2>
          <Currency
            value={getSummary.data?.currentTotalValue || 0}
            className='text-3xl'
          />
        </div>
        <div className='flex flex-col justify-start items-end'>
          <Currency
            value={getSummary.data?.lastMonthHistoric.generalGainLosses || 0}
            colorize
            useSignals
          />
          <Percentage
            value={getSummary.data?.lastMonthHistoric.generalPercentage || 0}
            colorize
            useSignals
          />
        </div>
      </CardHeader>

      <CardContent className='flex-1'>
        <BalanceChart
          chartData={chartData}
          chartConfig={chartConfig}
        />
      </CardContent>
      <CardFooter className='justify-end mt-2'>
        <p className='text-muted-foreground font-thin text-xs'>
          Invested in this month {' '}
          <InvestedInputDialog
            currentValue={getSummary.data?.fixedIncomes.financialInjections[0].value || 0}
            id={getSummary.data?.fixedIncomes.financialInjections[0].id || ''}
          />
        </p>
      </CardFooter>
    </Card>
  )
}
