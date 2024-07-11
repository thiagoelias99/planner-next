'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import useOrders from '@/hooks/assets/use-orders'

interface Props {
  closeDialog: () => void
}

const formSchema = z.object({
  ticker: z.string().min(2).max(6),
  individualPrice: z.string().refine((value) => parseFloat(value) >= 0, {
    message: 'Price must be a positive number',
  }).transform((value) => parseFloat(value)),
  quantity: z.string()
    .refine((value) => Number(value) >= 0, {
      message: 'Quantity must be a positive number',
    })
    .refine((value) => Number.isSafeInteger(Number(value)), {
      message: 'Quantity must be an integer',
    })
    .transform((value) => Number(value)),
  orderType: z.string().refine((value) => ['BUY', 'SELL'].includes(value), {
    message: 'Invalid order type'
  }).transform((value) => value as 'BUY' | 'SELL')
})

export default function CreateOrderForm({ closeDialog }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticker: undefined,
      individualPrice: undefined,
      quantity: undefined,
      orderType: undefined,
    },
  })

  const { createStockOrder } = useOrders()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createStockOrder.mutate(values)
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
          name="ticker"
          render={({ field }) => (
            <FormItem className=''>
              <FormLabel>Ticker</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='w-full flex justify-between items-start gap-6'>
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className=''>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type='number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="individualPrice"
            render={({ field }) => (
              <FormItem className=''>
                <FormLabel>Price</FormLabel>
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
        <div className='w-full flex justify-between items-end gap-8 pt-4'>
          <Button type='button' className='w-full' variant='success'
            onClick={() => {
              form.setValue('orderType', 'BUY')
              form.handleSubmit(onSubmit)()
            }
            }
          >Buy</Button>
          <Button type='button' className='w-full' variant='destructive'
            onClick={() => {
              form.setValue('orderType', 'SELL')
              form.handleSubmit(onSubmit)()
            }
            }
          >Sell</Button>
        </div>
      </form>
    </Form>
  )
}