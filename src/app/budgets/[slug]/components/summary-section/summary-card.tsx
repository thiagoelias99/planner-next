import { formatCurrency } from '@/lib/format-currency'
import React from 'react'

interface Props {
  title: string
  value: number
  previewValue: number
}

export default function SummaryCard({ title, value, previewValue }: Props) {
  return (
    <div className='p-2 flex flex-col justify-center items-center gap-1 border border-1 rounded'>
      <h2 className='font-semibold text-lg'>{title}</h2>
      <p className='font-bold text-base'>{formatCurrency(value)}</p>
    </div>
  )
}
