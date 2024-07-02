import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { z } from '@/lib/pt-zod'
import { BudgetPaymentMethod } from '@/models/budget/budget-payment-method.enum'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ComboboxForm } from '@/components/ui/combobox-form'
import { CreateBudgetDto } from '@/hooks/budgets/budget-create.dto'
import { useEffect, useState } from 'react'
import { DateInput } from '@/components/ui/date-input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BudgetClass } from '@/models/budget/budget-class.enum'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  createFunction: (data: CreateBudgetDto) => void
  isLoading: boolean
  isSuccess: boolean
}

const formSchema = z.object({
  currentValue: z.string().refine((value) => parseFloat(value) >= 0, {
    message: 'O valor deve ser positivo',
  }).transform((value) => parseFloat(value)),
  budgetClass: z.string(),
  description: z.string().min(3).max(255),
  startDate: z.string().transform((data) => new Date(data)).transform((data) => data.toISOString()).optional(),
  endDate: z.string().transform((data) => new Date(data)).transform((data) => data.toISOString()).optional(),
  paymentMethod: z.string().optional().default(BudgetPaymentMethod.TRANSFER),
})

export default function CreateBudgetDialog({ open, onOpenChange, createFunction, isSuccess, isLoading }: Props) {
  const [showMore, setShowMore] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentValue: 0,
      budgetClass: BudgetClass.INCOME,
      description: '',
      startDate: undefined,
      endDate: undefined,
      paymentMethod: BudgetPaymentMethod.TRANSFER,
    },
  })

  useEffect(() => {
    if (isSuccess) {
      form.reset()
      onOpenChange(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      createFunction({ ...values, paymentMethod: values.paymentMethod as BudgetPaymentMethod, budgetClass: values.budgetClass as BudgetClass })
    } catch (error) {
      throw error
    }
  }

  const paymentOptions = Object.keys(BudgetPaymentMethod).map((option, index) => {
    return {
      label: Object.values(BudgetPaymentMethod)[index],
      value: Object.keys(BudgetPaymentMethod)[index]
    }
  })

  const budgetClassOptions = Object.keys(BudgetClass).map((option, index) => {
    return {
      label: Object.values(BudgetClass)[index],
      value: Object.keys(BudgetClass)[index]
    }
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='w-[90%] top-[5%] px-3 translate-y-0 sm:max-w-[425px] bg-card rounded-xl border-2'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="">
            <ScrollArea className='w-full'>
              <div className='w-full py-2 px-1 space-y-4 grid grid-cols-4'>
                <ComboboxForm
                  label='Tipo'
                  form={form}
                  fieldName='budgetClass'
                  options={budgetClassOptions}
                  className='w-full col-span-4'
                  inputTextAlight='center'
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem
                      className='col-span-4'
                    >
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentValue"
                  render={({ field }) => (
                    <FormItem className='col-span-2'>
                      <FormLabel>Valor</FormLabel>
                      <FormControl>
                        <div className='flex flex-row justify-start items-center gap-4 mt-2'>
                          <span className='font-semibold text-base'>R$</span>
                          <Input type='number' {...field} className='text-center' />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <ComboboxForm
                  form={form}
                  fieldName='paymentMethod'
                  options={paymentOptions}
                  className='w-full col-span-2 pl-4'
                  inputTextAlight='center'
                  label='Método de Pagamento'
                />
                <span
                  role='button'
                  className='font-semibold text-sm col-span-4 text-end pointer'
                  onClick={() => setShowMore(!showMore)}
                >{showMore ? 'mostrar menos' : 'mostrar mais'}</span>
                {showMore && (
                  <>
                    <div className='col-span-4 w-full flex flex-row justify-between items-center gap-4'>
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <FormLabel>Data Inicial</FormLabel>
                            <FormControl>
                              <DateInput {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <FormLabel>Data Final</FormLabel>
                            <FormControl className='mt-0'>
                              <DateInput {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
                <Button
                  className='col-span-4'
                  type="submit"
                  disabled={isLoading}
                >Confirmar</Button>
              </div>
            </ScrollArea>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
