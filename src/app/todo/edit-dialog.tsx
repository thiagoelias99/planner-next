import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useToDos from '@/hooks/todos/use-todo'
import { useToast } from '@/components/ui/use-toast'
import { z } from '@/lib/pt-zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { DateInput } from '@/components/ui/date-input'
import { isAfter, add } from 'date-fns'
import { Textarea } from '@/components/ui/text-area'
import { ToDoItem } from '@/models/todos/todo'
import { useEffect } from 'react'
import { Trash2Icon } from 'lucide-react'

interface CreateTodoDialogProps {
  open: boolean
  selectedTodo: ToDoItem | undefined
  onOpenChange: (open: boolean) => void
}

const formSchema = z.object({
  title: z.string().min(1).max(30),
  description: z.string().max(255).optional(),
  date: z.string().transform((value) => new Date(value)).refine((value) => {
    return value instanceof Date && isAfter(add(value, { days: 1 }), new Date())
  }, 'Data não deve ser anterior a data atual').transform((value) => value.toISOString()),
})

export default function EditTodoDialog({ open, selectedTodo, onOpenChange }: CreateTodoDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: undefined,
      description: undefined,
      date: new Date().toISOString().substring(0, 10),
    },
  })

  const { createTodo, updateTodo, deleteTodo } = useToDos()
  const { toast } = useToast()

  useEffect(() => {
    if (selectedTodo) {
      form.setValue('title', selectedTodo.title)
      form.setValue('description', selectedTodo.description)
      form.setValue('date', new Date(selectedTodo.date).toISOString().substring(0, 10))
    } else {
      form.reset()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTodo])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedTodo) {
      try {
        await createTodo.mutateAsync({ ...values, date: new Date(values.date) })
        form.reset()
        toast({ description: 'To-Do criado com sucesso', variant: 'default', duration: 1000 })
        onOpenChange(false)
      } catch (error) {
        throw error
      }
    } else {
      try {
        await updateTodo.mutateAsync({ ...values, id: selectedTodo.id, date: new Date(values.date) })
        form.reset()
        toast({ description: 'To-Do atualizado com sucesso', variant: 'default', duration: 1000 })
        onOpenChange(false)
      } catch (error) {
        throw error
      }
    }
  }

  function handleDelete() {
    if (selectedTodo) {
      deleteTodo.mutate(selectedTodo.id)
      onOpenChange(false)
      toast({ description: 'To-Do excluido com sucesso', variant: 'destructive', duration: 1000 })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='w-[390px] border-none p-4 rounded-lg'>
        <DialogHeader className='flex flex-row justify-between items-center'>
          <h1 className='text-base font-bold text-start w-full'>{selectedTodo ? 'Editar To-Do' : 'Criar novo To-Do'}</h1>
          <Button
            size='icon'
            variant='destructive'
            onClick={handleDelete}
            className={selectedTodo ? '' : 'hidden'}>
            <Trash2Icon />
          </Button>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
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
              name="date"
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <DateInput {...field} />
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
                    <Textarea className='min-h-[160px]' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>{selectedTodo ? 'Salvar' : 'Criar'}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
