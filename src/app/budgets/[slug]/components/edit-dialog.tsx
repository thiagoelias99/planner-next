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
import ExpandSection from '@/components/ui/expand-section'
import { Budget } from '@/models/budget/budget'
import { UpdateTransactionDto } from '@/hooks/budgets/update-transaction.dto'
import { RecycleIcon, Trash2Icon } from 'lucide-react'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  createFunction: (data: CreateBudgetDto) => void
  updateFunction: (data: UpdateTransactionDto) => void
  deleteFunction: (data: UpdateTransactionDto) => void
  restoreFunction: (data: UpdateTransactionDto) => void
  selectedBudget: Budget | undefined
  isLoading: boolean
}

const formSchema = z.object({
  currentValue: z.string().refine((value) => parseFloat(value) >= 0, {
    message: 'O valor deve ser positivo',
  }),
  budgetClass: z.string(),
  description: z.string().min(3).max(255),
  startDate: z.string().transform((data) => new Date(data)).transform((data) => data.toISOString()).optional(),
  endDate: z.string().transform((data) => new Date(data)).transform((data) => data.toISOString()).optional(),
  paymentMethod: z.string().optional().default(BudgetPaymentMethod.TRANSFER),
})

export default function CreateBudgetDialog({ open, onOpenChange, createFunction, updateFunction, deleteFunction, restoreFunction, isLoading, selectedBudget }: Props) {
  const [showMore, setShowMore] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentValue: undefined,
      budgetClass: undefined,
      description: undefined,
      startDate: undefined,
      endDate: undefined,
      paymentMethod: undefined,
    },
  })

  useEffect(() => {
    form.reset()
    if (selectedBudget) {
      form.setValue('currentValue', selectedBudget.currentValue.toString())
      form.setValue('budgetClass', selectedBudget.budgetClass)
      form.setValue('description', selectedBudget.description)
      form.setValue('startDate', new Date(selectedBudget.startDate).toISOString().substring(0, 10))
      form.setValue('paymentMethod', selectedBudget.paymentMethod)

      let endDate = new Date(selectedBudget.endDate).toISOString().substring(0, 10)
      if (endDate !== '3000-06-05') {
        form.setValue('endDate', endDate)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, selectedBudget])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (selectedBudget) {
      try {
        updateFunction({
          ...values,
          id: selectedBudget.transactions[0].id,
          parentId: selectedBudget.id,
          value: parseFloat(values.currentValue),
          currentValue: parseFloat(values.currentValue),
          budgetClass: values.budgetClass as BudgetClass,
          paymentMethod: values.paymentMethod as BudgetPaymentMethod,
        })
        onOpenChange(false)
      } catch (error) {
        throw error
      }
      return
    } else {
      try {
        createFunction({
          ...values,
          paymentMethod: values.paymentMethod as BudgetPaymentMethod,
          budgetClass: values.budgetClass as BudgetClass,
          currentValue: parseFloat(values.currentValue)
        })
        onOpenChange(false)
      } catch (error) {
        throw error
      }
    }
  }

  function onDelete() {
    if (selectedBudget) {
      deleteFunction(
        {
          id: selectedBudget.transactions[0].id,
          parentId: selectedBudget.id,
          value: selectedBudget.transactions[0].value
        }
      )
      onOpenChange(false)
    }
  }

  function onRestore() {
    if (selectedBudget) {
      restoreFunction({
        id: selectedBudget.transactions[0].id,
        parentId: selectedBudget.id,
        value: selectedBudget.transactions[0].value
      })
      onOpenChange(false)
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
      <DialogContent className='w-[90%] top-[5%] px-0 translate-y-0 sm:max-w-[390px] bg-card2 text-card2-foreground rounded-xl border-none'>
        <div className='w-full px-4 flex justify-between items-start'>
          <h1 className='text-lg font-bold'>{selectedBudget ? 'Atualizar item' : 'Novo item'}</h1>
          {selectedBudget && !selectedBudget.transactions[0].deleted && (
            <Button
              size='icon'
              variant='destructive'
              className='self-end'
              onClick={onDelete}
            >
              <Trash2Icon />
            </Button>
          )}
          {selectedBudget && selectedBudget.transactions[0].deleted && (
            <Button
              size='icon'
              variant='default'
              className='self-end'
              onClick={onRestore}
            >
              <RecycleIcon />
            </Button>
          )}
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="">
            <ScrollArea className='w-full'>
              <div className='w-full px-4 flex flex-col justify-start items-start gap-4'>
                <ComboboxForm
                  label='Tipo'
                  form={form}
                  fieldName='budgetClass'
                  options={budgetClassOptions}
                  className='w-full'
                  inputTextAlight='center'
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem
                      className='w-full flex flex-col justify-start items-start gap-2'
                    >
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='w-full flex justify-between items-start'>
                  <FormField
                    control={form.control}
                    name="currentValue"
                    render={({ field }) => (
                      <FormItem className='flex flex-col justify-start items-start gap-2'>
                        <FormLabel>Valor</FormLabel>
                        <FormControl>
                          <div className='flex flex-row justify-start items-center gap-4'>
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
                    className='w-full pl-4'
                    inputTextAlight='center'
                    label='Método de Pagamento'
                  />
                </div>
                <ExpandSection
                  label='mostrar mais'
                  labelWhenOpen='mostrar menos'
                  onClick={() => setShowMore(!showMore)} />
                {showMore && (
                  <div className='w-full flex flex-row justify-between items-start gap-4'>
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
                )}
                <Button
                  className='w-full'
                  type="submit"
                  disabled={isLoading}
                >Salvar</Button>
              </div>
            </ScrollArea>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
