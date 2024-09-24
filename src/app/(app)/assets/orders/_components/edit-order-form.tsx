'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import useOrders from '@/hooks/assets/use-orders'
import { ComboboxForm } from '@/components/ui/combobox-form'
import useStocks from '@/hooks/assets/use-stocks'
import { useEffect, useState } from 'react'
import { StockOrder, StockOrderType } from '@/models/assets/stock'

interface Props {
  closeDialog: () => void
  selectedOrder: StockOrder | undefined
}

const formSchema = z.object({
  ticker: z.string().min(2).max(6),
  individualPrice: z.union([
    z.string().refine((value) => parseFloat(value) >= 0, {
      message: 'Price must be a positive number',
    }).transform((value) => parseFloat(value))
    , z.number().int().positive()
  ]),
  quantity: z.union([
    z.string()
      .refine((value) => Number(value) >= 0, {
        message: 'Quantity must be a positive number',
      })
      .refine((value) => Number.isSafeInteger(Number(value)), {
        message: 'Quantity must be an integer',
      })
      .transform((value) => Number(value)),
    z.number().int().positive()
  ]),
  orderType: z.string().refine((value) => Object.keys(StockOrderType).includes(value), {
    message: 'Invalid stock order type'
  }).transform((value) => value as StockOrderType)
})

export default function EditOrderForm({ closeDialog, selectedOrder }: Props) {
  const [options, setOptions] = useState<{
    label: string
    value: string
  }[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticker: selectedOrder?.ticker || undefined,
      individualPrice: selectedOrder?.individualPrice || undefined,
      quantity: selectedOrder?.quantity || undefined,
      orderType: selectedOrder?.orderType || undefined,
    },
  })

  const { createStockOrder, updateStockOrder } = useOrders()
  const { getStocks } = useStocks()
  const orderTypeValues = Object.keys(StockOrderType).map((option, index) => {
    return {
      label: Object.values(StockOrderType)[index],
      value: Object.keys(StockOrderType)[index]
    }
  })

  useEffect(() => {
    setOptions(getStocks.data?.map((stock) => ({
      label: stock.ticker,
      value: stock.ticker
    })) || [])
  }, [getStocks.data])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (selectedOrder) {
        await updateStockOrder.mutate({ ...values, id: selectedOrder.id })
      } else {
        await createStockOrder.mutate(values)
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
        <ComboboxForm
          label='Ticker'
          form={form}
          fieldName='ticker'
          options={options}
          className='w-full'
          inputTextAlight='center'
          disabled={!!selectedOrder}
        />
        <div className='w-full flex justify-between items-start gap-6'>
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className=''>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input className='text-center' type='number' {...field} />
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
        {selectedOrder && (
          <ComboboxForm
            label='Ticker'
            form={form}
            fieldName='orderType'
            options={orderTypeValues}
            className='w-full'
            inputTextAlight='center'
          />
        )}
        <div className='w-full flex justify-between items-end gap-8 pt-4'>
          {!selectedOrder && (
            <>
              <Button type='button' className='w-full' variant='success'
                onClick={() => {
                  form.setValue('orderType', 'BUY' as StockOrderType)
                  form.handleSubmit(onSubmit)()
                }
                }
              >Buy</Button>
              <Button type='button' className='w-full' variant='destructive'
                onClick={() => {
                  form.setValue('orderType', StockOrderType.SELL)
                  form.handleSubmit(onSubmit)()
                }
                }
              >Sell</Button>
            </>
          )}
          {selectedOrder && (<Button className='w-full'>Save</Button>)}
        </div>
      </form>
    </Form>
  )
}