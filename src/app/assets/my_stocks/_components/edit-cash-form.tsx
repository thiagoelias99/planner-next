'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import useOrders from '@/hooks/assets/use-orders'
import { ComboboxForm } from '@/components/ui/combobox-form'
import { CashBoxAndPensionType, CashBoxPension } from '@/models/assets/fixed-income'

interface Props {
  closeDialog: () => void
  selectedItem: CashBoxPension | undefined
}

const formSchema = z.object({
  description: z.string().min(2),
  value: z.union([
    z.string().refine((value) => parseFloat(value) >= 0, {
      message: 'Price must be a positive number',
    }).transform((value) => parseFloat(value))
    , z.number().int().positive()
  ]),
  type: z.string().refine((value) => Object.keys(CashBoxAndPensionType).includes(value), {
    message: 'Invalid type'
  }).transform((value) => value as CashBoxAndPensionType)
})

export default function EditCashForm({ closeDialog, selectedItem }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: selectedItem?.description || undefined,
      value: selectedItem?.value || undefined,
      type: selectedItem?.type || undefined,
    },
  })

  const { createCashBoxPensionOrder, updateCashBoxPensionOrder } = useOrders()
  const orderTypeValues = Object.keys(CashBoxAndPensionType).map((_, index) => {
    return {
      label: Object.values(CashBoxAndPensionType)[index],
      value: Object.keys(CashBoxAndPensionType)[index]
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (selectedItem) {
        await updateCashBoxPensionOrder.mutate({ ...values, id: selectedItem.id })
      } else {
        await createCashBoxPensionOrder.mutate(values)
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
        <div className='w-full flex justify-between items-start gap-4'>
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className=''>
                <FormLabel>Value</FormLabel>
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
            label='Type'
            form={form}
            fieldName='type'
            options={orderTypeValues}
            className='w-full mt-1'
            inputTextAlight='center'
            disabled={!!selectedItem}
          />
        </div>
        <Button type='submit' className='w-full mt-2'>
          Save
        </Button>
      </form>
    </Form>
  )
}