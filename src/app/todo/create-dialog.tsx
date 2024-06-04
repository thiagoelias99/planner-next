import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useToDos from '@/hooks/todos/use-todo'
import { z } from '@/lib/pt-zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { date } from 'zod'

interface CreateTodoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const formSchema = z.object({
  description: z.string().min(3).max(255),
  title: z.string().min(3).max(30),
})

export default function CreateTodoDialog({ open, onOpenChange }: CreateTodoDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      title: '',
    },
  })

  const { createTodo } = useToDos()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createTodo.mutateAsync({ date: new Date(), ...values })
      form.reset()
      onOpenChange(false)
    } catch (error) {
      throw error
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar novo To-Do</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full mt-4'>Criar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
