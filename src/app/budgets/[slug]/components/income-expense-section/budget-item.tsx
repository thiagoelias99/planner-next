'use client'

import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { BudgetSimplified } from '@/models/budget/budget-simplified'
import React from 'react'

interface Props {
  data: BudgetSimplified
  checkBoxHandler: (parentId: string, id: string, checked: boolean) => void
}

export default function BudgetItem({ data, checkBoxHandler }: Props) {
  const day = new Date(data.date).getDate()

  return (
    <Card className='w-full px-4 py-2 flex flex-row justify-between items-center gap-1'>
      <Checkbox
        className='w-4 h-4'
        checked={data.isChecked}
        onCheckedChange={(checked) => {
          checkBoxHandler(data.parentId, data.id, checked as boolean)
        }}
      />
      <div className='px-4 flex flex-1 flex-col justify-start items-start gap-1'>
        <h2 className='font-semibold text-lg'>{data.description}</h2>
        <p className='font-medium text-sm'>{`Dia ${day} - ${data.paymentMethod}`}</p>
      </div>
      <p className='font-bold text-xl'>{`R$ ${data.value}`}</p>
    </Card>
  )
}
