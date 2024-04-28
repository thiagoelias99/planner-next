import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { z } from '@/lib/pt-zod'
import { BudgetPaymentMethodEnum } from '@/models/budget/budget-payment-method.enum'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import IsIncomeSelect from './is-income-select'
import { ComboboxForm } from '@/components/ui/combobox-form'
import { CreateBudgetDto } from '@/hooks/budgets/budget-create.dto'
import { Checkbox } from '@/components/ui/checkbox'
import { DateInput } from '@/components/ui/date-input'
import { useEffect } from 'react'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  createFunction: (data: CreateBudgetDto) => void
  isSuccess: boolean
}

const formSchema = z.object({
  value: z.string().refine((value) => parseFloat(value) > 0, {
    message: 'O valor deve ser maior que 0',
  }).transform((value) => parseFloat(value)),
  isIncome: z.boolean().optional().default(true),
  description: z.string().min(3).max(255),
  expectedDay: z.number().min(1).max(31).optional(),
  consolidated: z.boolean().optional(),
  startDate: z.string().transform((data) => new Date(data)).transform((data) => data.toISOString()).optional(),
  endDate: z.string().transform((data) => new Date(data)).transform((data) => data.toISOString()).optional(),
  paymentMethod: z.string().optional().default(BudgetPaymentMethodEnum.TRANSFER),
})

export default function CreateBudgetDialog({ open, onOpenChange, createFunction, isSuccess }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: 0,
      isIncome: true,
      description: '',
      expectedDay: 1,
      consolidated: true,
      startDate: undefined,
      endDate: undefined,
      paymentMethod: BudgetPaymentMethodEnum.TRANSFER,
    },
  })

  useEffect(() => {
    if (isSuccess) {
      form.reset()
      onOpenChange(false)
    }
  }, [isSuccess])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      createFunction({ ...values, paymentMethod: values.paymentMethod as BudgetPaymentMethodEnum })
    } catch (error) {
      throw error
    }
  }

  const paymentOptions = Object.keys(BudgetPaymentMethodEnum).map((option, index) => {
    return {
      label: Object.values(BudgetPaymentMethodEnum)[index],
      value: Object.keys(BudgetPaymentMethodEnum)[index]
    }
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Descrição" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <IsIncomeSelect form={form} fieldName="isIncome" />
            <ComboboxForm
              form={form}
              label='Pagamento'
              fieldName='paymentMethod'
              options={paymentOptions} />
            <FormField
              control={form.control}
              name="consolidated"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
                  <FormLabel>Data Final</FormLabel>
                  <FormControl>
                    <DateInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
