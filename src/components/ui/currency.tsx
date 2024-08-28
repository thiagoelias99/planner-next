import { formatCurrency } from '@/lib/format-currency'
import { cn } from '@/lib/utils'
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'

interface PercentageProps {
  value: number
  colorize?: boolean
  useSymbols?: boolean
  useSignals?: boolean
  className?: ClassNameValue
}

export default function Currency({ value, colorize = false, useSymbols = false, useSignals = false, className }: PercentageProps) {
  return (
    <div className={cn(`flex flex-row justify-start items-center gap-2 ${colorize ? (value > 0 ? 'text-green-500' : value === 0 ? '' : 'text-red-500') : ''}`, className)}
    >
      {useSymbols && (<span>{value > 0 ? <ArrowUpIcon /> : value === 0 ? '' : <ArrowDownIcon />}</span>)}
      {useSignals && (<span>{value > 0 ? '+' : value < 0 ? '-' : ''}</span>)}
      <p>{formatCurrency(value)}</p>
    </div>
  )
}
