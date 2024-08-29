'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { formatCurrency } from '@/lib/format-currency'
import { ClassNameValue } from 'tailwind-merge'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Currency from '@/components/ui/currency'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import useOrders from '@/hooks/assets/use-orders'
import { useToast } from '@/components/ui/use-toast'

interface Props {
  className?: ClassNameValue
  currentValue: number
  id: string
}

const formSchema = z.object({
  value: z.union([
    z.string().refine((value) => parseFloat(value) >= 0, {
      message: 'Price must be a positive number',
    }).transform((value) => parseFloat(value))
    , z.number()
  ]),
})

export default function InvestedInputDialog({ currentValue, id, className }: Props) {
  const [valueToAdd, setValueToAdd] = useState<number>(0)
  const [valueToRemove, setValueToRemove] = useState<number>(0)
  const [dialogState, setDialogState] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: currentValue,
    },
  })

  const { updateCashBoxPensionOrder } = useOrders()
  const { toast } = useToast()

  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {
      await updateCashBoxPensionOrder.mutate({ ...values, id })

      toast({
        title: 'Success',
        description: 'Invested value updated successfully'
      })

      setDialogState(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update invested value',
        variant: 'destructive'
      })
    }
  }

  function handleAddButtonClick() {
    if (valueToAdd === 0) {
      return
    }

    form.setValue('value', form.getValues('value') + valueToAdd)
    setValueToAdd(0)
  }

  function handleRemoveButtonClick() {
    if (valueToRemove === 0) {
      return
    }

    form.setValue('value', form.getValues('value') - valueToRemove)
    setValueToRemove(0)
  }

  return (
    <Dialog open={dialogState} onOpenChange={setDialogState}>
      <DialogTrigger
        className='text-base text-foreground underline underline-offset-4 decoration-primary decoration-4 cursor-pointer'
      >
        {formatCurrency(currentValue)}
      </DialogTrigger>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>Updated Invested Value</DialogTitle>
          <DialogDescription>
            Let's update my invested amount in this month.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='inline-flex gap-2 py-4'>
              <p>My current value is</p>
              <Currency value={currentValue} className='font-bold' />
            </div>
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Set to</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be the new invested value total for this month.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <div className='w-full py-4 flex items-center gap-4'>
                <div className='w-full h-1 bg-primary rounded-sm'></div>
                <p>Helpers</p>
                <div className='w-full h-1 bg-primary rounded-sm'></div>
              </div>
              <div className='w-full flex justify-center items-center gap-2'>
                <p className='w-14'>Add</p>
                <Input type='number' className='max-w-32 text-center' value={valueToAdd} onChange={e => setValueToAdd(Number(e.target.value))} />
                <Button type='button' size='icon' onClick={handleAddButtonClick}><PlusIcon className='h-6 w-6' /></Button>
              </div>
              <div className='w-full py-2 flex justify-center items-center gap-2'>
                <p className='w-14'>Remove</p>
                <Input type='number' className='max-w-32 text-center' value={valueToRemove} onChange={e => setValueToRemove(Number(e.target.value))} />
                <Button type='button' size='icon' onClick={handleRemoveButtonClick}><MinusIcon className='h-6 w-6' /></Button>
              </div>
            </div>
            <Button className='w-full' type="submit">Submit</Button>
          </form>
        </Form>

      </DialogContent>
    </Dialog>

  )
}
