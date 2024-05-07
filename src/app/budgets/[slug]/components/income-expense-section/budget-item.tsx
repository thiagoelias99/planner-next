'use client'

import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { formatCurrency } from '@/lib/format-currency'
import { BudgetPaymentMethodEnum } from '@/models/budget/budget-payment-method.enum'
import { BudgetSimplified } from '@/models/budget/budget-simplified'
import React from 'react'

interface Props {
  data: BudgetSimplified
  checkBoxHandler: (parentId: string, id: string, checked: boolean) => void
  onTouchHandler: (parentId: string ,id: string) => void
}

export default function BudgetItem({ data, checkBoxHandler, onTouchHandler }: Props) {
  const day = new Date(data.date).getDate()

  const paymentOptions = Object.keys(BudgetPaymentMethodEnum).map((option, index) => {
    return {
      label: Object.values(BudgetPaymentMethodEnum)[index],
      value: Object.keys(BudgetPaymentMethodEnum)[index]
    }
  })

  return (
    <Card className='w-full px-4 py-2 flex flex-row justify-between items-center gap-1'>
      <Checkbox
        className='w-4 h-4'
        checked={data.isChecked}
        onCheckedChange={(checked) => {
          checkBoxHandler(data.parentId, data.id, checked as boolean)
        }}
      />
      <div
        className='px-4 flex flex-1 flex-col justify-start items-start gap-1'
        onClick={() => onTouchHandler(data.parentId, data.id)}
      >
        <h2 className='font-semibold text-lg'>{data.description}</h2>
        <p className='font-medium text-sm'>{`Dia ${day} - ${paymentOptions.filter(option => option.value === data.paymentMethod)[0].label}`}</p>
      </div>
      <p className='font-bold text-xl'>{formatCurrency(data.value)}</p>
    </Card>
  )
}
