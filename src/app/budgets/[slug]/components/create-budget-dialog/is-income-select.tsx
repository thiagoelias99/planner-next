import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { ClassNameValue } from 'tailwind-merge'

interface Props {
  form: UseFormReturn<any>
  fieldName: string
  className?: ClassNameValue
}

export default function IsIncomeSelect({ form, fieldName, className }: Props) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={`w-full ${className}`}>
          <FormControl>
            <div className='w-full h-full rounded flex flex-row justify-center items-center'>
              <div
                className={`h-full rounded-s-lg bg-[#5C956F] pointer flex justify-center items-center ${field.value ? 'w-3/5 opacity-100' : 'w-2/5 opacity-20'}`}
                onClick={() => field.onChange(true)}
              >
                <p className={`${field.value ? 'text-base font-semibold' : 'text-sm font-medium'}`}>Receita</p>
              </div>
              <div
                className={`h-full rounded-e-lg bg-red-500 pointer flex justify-center items-center ${!field.value ? 'w-3/5 opacity-100' : 'w-2/5 opacity-20'}`}
                onClick={() => field.onChange(false)}
              >
                <p className={`${!field.value ? 'text-base font-semibold' : 'text-sm font-medium'}`}>Despesa</p>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}