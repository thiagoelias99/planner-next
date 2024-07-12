import { formatPercentage } from '@/lib/format-percentage'
import { cn } from '@/lib/utils'
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'

interface PercentageProps {
  value: number
  colorize?: boolean
  useSymbols?: boolean
  className?: ClassNameValue
}

export default function Percentage({ value, colorize = true, useSymbols = true, className }: PercentageProps) {
  return (
    <div className={cn(`flex flex-row justify-center items-center gap-2 ${colorize ? (value > 0 ? 'text-green-500' : value === 0 ? '' : 'text-red-500') : ''}`, className)}
    >
      {useSymbols && (<span>{value > 0 ? <ArrowUpIcon /> : value === 0 ? '' : <ArrowDownIcon />}</span>)}
      <p>{formatPercentage(value)}</p>
    </div>
  )
}
