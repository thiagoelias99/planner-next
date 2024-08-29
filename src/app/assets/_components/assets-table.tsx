'use client'

import Currency from '@/components/ui/currency'
import Percentage from '@/components/ui/percentage'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import useAssets from '@/hooks/assets/use-assets'
import { cn } from '@/lib/utils'
import { ClassNameValue } from 'tailwind-merge'


interface Props {
  className?: ClassNameValue
}

export default function AssetsTable({ className }: Props) {
  const { getSummary } = useAssets()

  type TableData = {
    name: string,
    balance: number,
    chg: number,
    chgPercent: number,
    currentPercent: number,
    goal: number,
    adjustment: number,
    color: string
  }
  const tableData: TableData[] = [
    {
      name: 'Fixed Incomes',
      balance: getSummary.data?.fixedIncomesTotalValue || 0,
      chg: getSummary.data?.lastMonthHistoric.fixedIncomesGainLosses || 0,
      chgPercent: getSummary.data?.lastMonthHistoric.fixedIncomesPercentage || 0,
      currentPercent: getSummary.data?.fixedIncomesPercentage || 0,
      goal: getSummary.data?.fixedIncomesPercentagePlanned || 0,
      adjustment: getSummary.data?.fixedIncomesAdjust || 0,
      color: 'hsl(var(--fixedIncomes))'
    },
    {
      name: 'Cash Boxes',
      balance: getSummary.data?.cashBoxesTotalValue || 0,
      chg: getSummary.data?.lastMonthHistoric.cashBoxesGainLosses || 0,
      chgPercent: getSummary.data?.lastMonthHistoric.cashBoxesPercentage || 0,
      currentPercent: getSummary.data?.cashBoxesPercentage || 0,
      goal: getSummary.data?.cashBoxesPercentagePlanned || 0,
      adjustment: getSummary.data?.cashBoxesAdjust || 0,
      color: 'hsl(var(--cashBoxes))'
    },
    {
      name: 'Stocks',
      balance: getSummary.data?.stocksTotalValue || 0,
      chg: getSummary.data?.lastMonthHistoric.stocksGainLosses || 0,
      chgPercent: getSummary.data?.lastMonthHistoric.stocksPercentage || 0,
      currentPercent: getSummary.data?.stocksPercentage || 0,
      goal: getSummary.data?.stocksPercentagePlanned || 0,
      adjustment: getSummary.data?.stocksAdjust || 0,
      color: 'hsl(var(--stocks))'
    },
    {
      name: 'Reits',
      balance: getSummary.data?.reitsTotalValue || 0,
      chg: getSummary.data?.lastMonthHistoric.reitsGainLosses || 0,
      chgPercent: getSummary.data?.lastMonthHistoric.reitsPercentage || 0,
      currentPercent: getSummary.data?.reitsPercentage || 0,
      goal: getSummary.data?.reitsPercentagePlanned || 0,
      adjustment: getSummary.data?.reitsAdjust || 0,
      color: 'hsl(var(--reits))'
    },
    {
      name: 'Internationals',
      balance: getSummary.data?.internationalsTotalValue || 0,
      chg: getSummary.data?.lastMonthHistoric.internationalsGainLosses || 0,
      chgPercent: getSummary.data?.lastMonthHistoric.internationalsPercentage || 0,
      currentPercent: getSummary.data?.internationalsPercentage || 0,
      goal: getSummary.data?.internationalsPercentagePlanned || 0,
      adjustment: getSummary.data?.internationalsAdjust || 0,
      color: 'hsl(var(--internationals))'
    },
    {
      name: 'Gold',
      balance: getSummary.data?.goldsTotalValue || 0,
      chg: getSummary.data?.lastMonthHistoric.goldsGainLosses || 0,
      chgPercent: getSummary.data?.lastMonthHistoric.goldsPercentage || 0,
      currentPercent: getSummary.data?.goldsPercentage || 0,
      goal: getSummary.data?.goldsPercentagePlanned || 0,
      adjustment: getSummary.data?.goldsAdjust || 0,
      color: 'hsl(var(--golds))'
    },
    {
      name: 'Cryptos',
      balance: getSummary.data?.cryptosTotalValue || 0,
      chg: getSummary.data?.lastMonthHistoric.cryptosGainLosses || 0,
      chgPercent: getSummary.data?.lastMonthHistoric.cryptosPercentage || 0,
      currentPercent: getSummary.data?.cryptosPercentage || 0,
      goal: getSummary.data?.cryptosPercentagePlanned || 0,
      adjustment: getSummary.data?.cryptosAdjust || 0,
      color: 'hsl(var(--cryptos))'
    },
    {
      name: 'Pensions',
      balance: getSummary.data?.pensionsTotalValue || 0,
      chg: getSummary.data?.lastMonthHistoric.pensionsGainLosses || 0,
      chgPercent: getSummary.data?.lastMonthHistoric.pensionsPercentage || 0,
      currentPercent: getSummary.data?.pensionsPercentage || 0,
      goal: getSummary.data?.pensionsPercentagePlanned || 0,
      adjustment: getSummary.data?.pensionsAdjust || 0,
      color: 'hsl(var(--pensions))'
    },
    {
      name: 'Properties',
      balance: getSummary.data?.propertiesTotalValue || 0,
      chg: getSummary.data?.lastMonthHistoric.propertiesGainLosses || 0,
      chgPercent: getSummary.data?.lastMonthHistoric.propertiesPercentage || 0,
      currentPercent: getSummary.data?.propertiesPercentage || 0,
      goal: getSummary.data?.propertiesPercentagePlanned || 0,
      adjustment: getSummary.data?.propertiesAdjust || 0,
      color: 'hsl(var(--properties))'
    }
  ]

  return (
    <div className={cn('w-full rounded-lg', className)}>
      <Table className='rounded-lg'>
        <TableCaption>This is a list of my current assets portfolio</TableCaption>
        <TableHeader>
          <TableRow className='cursor-default hover:bg-transparent hover:text-muted-foreground text-muted-foreground'>
            <TableHead></TableHead>
            <TableHead className='text-start'>Name</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Chg</TableHead>
            <TableHead>Chg %</TableHead>
            <TableHead>Current %</TableHead>
            <TableHead>Goal</TableHead>
            <TableHead>Adjustment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((data, index) => (
            <TableRow key={index}>
              <TableCell>
                <div
                  className='w-2 h-6 rounded'
                  style={{ backgroundColor: data.color }}
                />
              </TableCell>
              <TableCell className='text-start'>{data.name}</TableCell>
              <TableCell><Currency value={data.balance} className='justify-center' /></TableCell>
              <TableCell><Currency value={data.chg} colorize className='justify-center' /></TableCell>
              <TableCell><Percentage value={data.chgPercent} colorize useSymbols className='justify-center' /></TableCell>
              <TableCell><Percentage value={data.currentPercent / 100} className='justify-center' /></TableCell>
              <TableCell><Percentage value={data.goal / 100} className='justify-center' /></TableCell>
              <TableCell><Currency value={data.adjustment} useSymbols className='justify-center' /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}