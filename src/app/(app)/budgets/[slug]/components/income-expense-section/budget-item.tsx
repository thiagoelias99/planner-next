'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { formatCurrency } from '@/lib/format-currency'
import { BudgetPaymentMethod } from '@/models/budget/budget-payment-method.enum'
import { Budget } from '@/models/budget/budget'
import React from 'react'

interface Props {
  data: Budget
  checkBoxHandler: (parentId: string, id: string, checked: boolean) => void
  onTouchHandler: (parentId: string, id: string) => void
}

export default function BudgetItem({ data, checkBoxHandler, onTouchHandler }: Props) {
  const day = new Date(data.transactions[0].date).getUTCDate()

  const paymentOptions = Object.keys(BudgetPaymentMethod).map((option, index) => {
    return {
      label: Object.values(BudgetPaymentMethod)[index],
      value: Object.keys(BudgetPaymentMethod)[index]
    }
  })

  return (
    <div className={`w-full bg-card2 text-card2-foreground px-4 py-2 flex flex-row justify-between items-center gap-1 rounded-lg ${data.transactions[0].deleted ? 'bg-destructive' : ''} hover:bg-primary hover:text-primary-foreground`}>
      <Checkbox
        className={`w-7 h-7 ${data.transactions[0].deleted ? 'hidden' : ''}`}
        checked={data.transactions[0].checked}
        onCheckedChange={(checked) => {
          checkBoxHandler(data.id, data.transactions[0].id, checked as boolean)
        }}
      />
      <div
        className={`cursor-pointer flex flex-row justify-between items-center gap-1 w-full ${data.transactions[0].deleted ? 'opacity-50 line-through' : ''}`}
        onClick={() => onTouchHandler(data.id, data.transactions[0].id)}>
        <div
          className='px-4 flex flex-1 flex-col justify-start items-start gap-1'
        >
          <h2 className='font-semibold text-base sm:text-lg line-clamp-1'>{data.description}</h2>
          <p className='font-medium text-sm'>{`Dia ${day} - ${paymentOptions.filter(option => option.value === data.paymentMethod)[0].label}`}</p>
        </div>
        <p className='font-bold text-lg sm:text-xl line-clamp-1'>{formatCurrency(data.transactions[0].value)}</p>
      </div>
    </div>
  )
}