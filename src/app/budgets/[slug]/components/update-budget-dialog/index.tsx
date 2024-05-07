import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UpdateBudgetDto } from '@/hooks/budgets/update-budget.dto'
import { z } from '@/lib/pt-zod'
import { BudgetSimplified } from '@/models/budget/budget-simplified'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
  value: z.string().refine((value) => parseFloat(value) >= 0, {
    message: 'O valor deve ser positivo',
  }).transform((value) => parseFloat(value)),
})

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  budget?: BudgetSimplified
  updateFunction: (data: UpdateBudgetDto) => void
  isSuccess?: boolean
}

export default function UpdateBudgetDialog({ open, onOpenChange, budget, updateFunction, isSuccess }: Props) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  useEffect(() => {
    if (budget) {
      form.reset({
        ...budget,
        value: budget.value
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budget])

  useEffect(() => {
    console.log(isSuccess)
    if (isSuccess) {
      onOpenChange(false)
    }
  }, [isSuccess, onOpenChange])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (budget) {
        updateFunction({
          id: budget.id,
          parentId: budget.parentId,
          ...values
        })
      }
    } catch (error) {
      throw error
    }
  }



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='w-[80%] rounded-md'
      >
        <Form {...form}
        >
          <form
            onSubmit={form.handleSubmit(onSubmit)}
          >

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem className='col-span-2'>
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

            <Button className='col-span-4' type="submit">Confirmar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
