'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { ComboboxForm } from '@/components/ui/combobox-form'
import { Stock, StockType } from '@/models/assets/stock'
import { z } from 'zod'
import useStocks from '@/hooks/assets/use-stocks'
import { useEffect } from 'react'

const formSchema = z.object({
  ticker: z.string().min(2).max(6),
  name: z.string().min(1).max(255),
  price: z.string().refine((value) => parseFloat(value) >= 0, {
    message: 'Price must be a positive number',
  }).transform((value) => parseFloat(value)),
  stockType: z.string().refine((value) => Object.keys(StockType).includes(value), {
    message: 'Invalid stock type'
  }).transform((value) => value as StockType)
})

interface EditStockDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedStock?: Stock | null
}

export default function EditStockDialog({ open, onOpenChange, selectedStock }: EditStockDialogProps) {
  const { createStock, updateStock } = useStocks()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      ticker: undefined,
      price: undefined,
      stockType: undefined,
    },
  })

  useEffect(() => {
    if (selectedStock) {
      form.setValue('name', selectedStock.name)
      form.setValue('ticker', selectedStock.ticker)
      form.setValue('price', selectedStock.price)
      form.setValue('stockType', selectedStock.stockType as StockType)
    } else {
      form.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStock])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (selectedStock) {
      try {
        await updateStock.mutate(values)
        form.reset()
        onOpenChange(false)
      } catch (error) {
        throw error
      }
    } else {
      try {
        await createStock.mutate(values)
        form.reset()
        onOpenChange(false)
      } catch (error) {
        throw error
      }
    }
  }

  const stockTypeOptions = Object.keys(StockType).map((_, index) => {
    return {
      label: Object.values(StockType)[index],
      value: Object.keys(StockType)[index]
    }
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='w-full max-w-[358px] border-none bg-card2 text-card2-foreground rounded-lg px-4 py-4 flex flex-col gap-4'
      >
        <DialogHeader>
          <h1 className='text-lg font-semibold'>Add an Stock</h1>
        </DialogHeader>
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
                    <Input
                      type='text' {...field}
                      disabled={selectedStock !== null}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
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
            <ComboboxForm
              form={form}
              fieldName='stockType'
              options={stockTypeOptions}
              className='w-full mt-1'
              inputTextAlight='center'
              label='Stock Type'
            />
            <Button type='submit' className='w-full mt-4'>Save</Button>
          </form>
        </Form>
      </DialogContent >
    </Dialog >
  )
}
