import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<any>
  fieldName: string
}

export default function IsIncomeSelect({ form, fieldName }: Props) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className='w-44 h-8 rounded flex flex-row justify-center items-center'>
              <div
                className={`h-full rounded-s bg-[#5C956F] pointer flex justify-center items-center ${field.value ? 'w-3/5 opacity-100' : 'w-2/5 opacity-20'}`}
                onClick={() => field.onChange(true)}
              >
                <p className='font-semibold text-base'>Receita</p>
              </div>
              <div
                className={`h-full rounded-e bg-red-500 pointer flex justify-center items-center ${!field.value ? 'w-3/5 opacity-100' : 'w-2/5 opacity-20'}`}
                onClick={() => field.onChange(false)}
              >
                <p className='font-semibold text-base'>Despesa</p>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}