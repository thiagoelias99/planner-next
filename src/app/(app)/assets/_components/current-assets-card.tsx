'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Currency from '@/components/ui/currency'
import Percentage from '@/components/ui/percentage'
import useAssets from '@/hooks/assets/use-assets'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ClassNameValue } from 'tailwind-merge'
import BalanceChart from './balance-chart'
import { formatCurrency } from '@/lib/format-currency'


import { Label, Pie, PieChart } from 'recharts'
import React from 'react'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import CurrentAssetsChart from './current-assets-chart'



interface Props {
  className?: ClassNameValue
}

export default function CurrentAssetsCard({ className }: Props) {
  const { getSummary } = useAssets()

  const chartData = [
    { name: 'stocks', amount: getSummary.data?.stocksTotalValue || 0, fill: 'var(--color-stocks)' },
    { name: 'reits', amount: getSummary.data?.reitsTotalValue || 0, fill: 'var(--color-reits)' },
    { name: 'internationals', amount: getSummary.data?.internationalsTotalValue || 0, fill: 'var(--color-internationals)' },
    { name: 'cryptos', amount: getSummary.data?.cryptosTotalValue || 0, fill: 'var(--color-cryptos)' },
    { name: 'golds', amount: getSummary.data?.goldsTotalValue || 0, fill: 'var(--color-golds)' },
    { name: 'cashBoxes', amount: getSummary.data?.cashBoxesTotalValue || 0, fill: 'var(--color-cashBoxes)' },
    { name: 'pensions', amount: getSummary.data?.pensionsTotalValue || 0, fill: 'var(--color-pensions)' },
    { name: 'fixedIncomes', amount: getSummary.data?.fixedIncomesTotalValue || 0, fill: 'var(--color-fixedIncomes)' },
    { name: 'properties', amount: getSummary.data?.propertiesTotalValue || 0, fill: 'var(--color-properties)' },
    { name: 'others', amount: getSummary.data?.sharesTotalValue || 0, fill: 'var(--color-others)' },
  ]


  const chartConfig = {
    amount: {
      label: 'Amount',
    },
    stocks: {
      label: 'Stocks',
      color: 'hsl(var(--stocks))',
    },
    reits: {
      label: 'Reits',
      color: 'hsl(var(--reits))',
    },
    internationals: {
      label: 'Internationals',
      color: 'hsl(var(--internationals))',
    },
    cryptos: {
      label: 'Cryptos',
      color: 'hsl(var(--cryptos))',
    },
    golds: {
      label: 'Golds',
      color: 'hsl(var(--golds))',
    },
    cashBoxes: {
      label: 'Cash Boxes',
      color: 'hsl(var(--cashBoxes))',
    },
    pensions: {
      label: 'Pensions',
      color: 'hsl(var(--pensions))',
    },
    fixedIncomes: {
      label: 'Fixed Incomes',
      color: 'hsl(var(--fixedIncomes))',
    },
    properties: {
      label: 'Properties',
      color: 'hsl(var(--properties))',
    },
    others: {
      label: 'Others',
      color: 'hsl(var(--others))',
    },
  } satisfies ChartConfig

  return (
    <Card className={cn('px-0 flex flex-col justify-center items-center', className)}>
      <CardContent className='w-full p-0 m-0'>        
        <CurrentAssetsChart chartData={chartData} chartConfig={chartConfig} />
      </CardContent>
    </Card>
  )
}
