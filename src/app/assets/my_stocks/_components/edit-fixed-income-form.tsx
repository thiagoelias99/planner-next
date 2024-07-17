'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import useOrders from '@/hooks/assets/use-orders'
import { ComboboxForm } from '@/components/ui/combobox-form'
import { FixedIncome, PosFixedIndexType } from '@/models/assets/fixed-income'
import { DateInput } from '@/components/ui/date-input'

interface Props {
  closeDialog: () => void
  selectedItem: FixedIncome | undefined
}

const formSchema = z.object({
  description: z.string().min(2),
  initialInvestment: z.union([
    z.string().refine((value) => parseFloat(value) >= 0, {
      message: 'Price must be a positive number',
    }).transform((value) => parseFloat(value))
    , z.number().positive()
  ]),
  initialDate: z.string().transform((data) => new Date(data)).transform((data) => data.toISOString()),
  dueDate: z.string().transform((data) => new Date(data)).transform((data) => data.toISOString()),
  currentValue: z.union([
    z.string().refine((value) => parseFloat(value) >= 0, {
      message: 'Price must be a positive number',
    }).transform((value) => parseFloat(value))
    , z.number().positive()
  ]).optional(),
  fixedRate: z.union([
    z.string().refine((value) => parseFloat(value) >= 0, {
      message: 'Price must be a positive number',
    }).transform((value) => parseFloat(value))
    , z.number().positive()
  ]).optional(),
  posFixedIndex: z.string().refine((value) => Object.keys(PosFixedIndexType).includes(value), {
    message: 'Invalid type'
  }).transform((value) => value as PosFixedIndexType).optional(),
})

export default function EditFixedIncomeForm({ closeDialog, selectedItem }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: selectedItem?.description || undefined,
      initialInvestment: selectedItem?.initialInvestment || undefined,
      initialDate: selectedItem && new Date(selectedItem?.initialDate).toISOString().substring(0, 10) || undefined,
      dueDate: selectedItem && new Date(selectedItem?.dueDate).toISOString().substring(0, 10) || undefined,
      currentValue: selectedItem?.currentValue || undefined,
      fixedRate: selectedItem?.fixedRate ? selectedItem?.fixedRate * 100 : undefined,
      posFixedIndex: selectedItem?.posFixedIndex || undefined,
    },
  })

  const { createFixedIncomeOrder, updateFixedIncomeOrder } = useOrders()
  const posFixedIndexValues = Object.keys(PosFixedIndexType).map((_, index) => {
    return {
      label: Object.values(PosFixedIndexType)[index],
      value: Object.keys(PosFixedIndexType)[index]
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (selectedItem) {
        await updateFixedIncomeOrder.mutate({ ...values, id: selectedItem.id, initialDate: new Date(values.initialDate), dueDate: new Date(values.dueDate) })
      } else {
        await createFixedIncomeOrder.mutate({ ...values, initialDate: new Date(values.initialDate), dueDate: new Date(values.dueDate) })
      }

      form.reset()
      closeDialog()
    } catch (error) {
      throw error
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full flex flex-col gap-2'
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className=''>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input className='text-center' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='w-full flex justify-between items-start gap-2'>
          <FormField
            control={form.control}
            name="initialInvestment"
            render={({ field }) => (
              <FormItem className=''>
                <FormLabel>Initial Investment</FormLabel>
                <div className='w-full flex justify-start items-center gap-4'>
                  <span>R$</span>
                  <FormControl>
                    <Input type='number' className='text-center' {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentValue"
            render={({ field }) => (
              <FormItem className=''>
                <FormLabel>Current Value</FormLabel>
                <div className='w-full flex justify-start items-center gap-4'>
                  <span>R$</span>
                  <FormControl>
                    <Input type='number' className='text-center' {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='w-full flex justify-between items-start gap-2'>
          <FormField
            control={form.control}
            name="initialDate"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Initial Date</FormLabel>
                <FormControl>
                  <DateInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <DateInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='w-full flex justify-between items-start gap-2'>
          <FormField
            control={form.control}
            name="fixedRate"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Fixed Rate</FormLabel>
                <div className='w-full flex justify-start items-center gap-4'>
                  <span>R$</span>
                  <FormControl>
                    <Input type='number' className='text-center' {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <ComboboxForm
            label='Pos Fixed Index'
            form={form}
            fieldName='posFixedIndex'
            options={posFixedIndexValues}
            className='mt-1'
            inputTextAlight='center'
          />
        </div>
        <Button type='submit' className='w-full mt-2'>
          Save
        </Button>
      </form>
    </Form>
  )
}