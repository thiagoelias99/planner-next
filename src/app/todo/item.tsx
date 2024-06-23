'use client'
import NextLink from 'next/link'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import useToDos from '@/hooks/todos/use-todo'
import { ToDoItem } from '@/models/todos/todo'
import { CircleAlert } from 'lucide-react'
import { addHours, isFuture, isToday } from 'date-fns'

interface TodoItemProps extends ToDoItem {

}

export default function TodoItem({ id, title, completed, date }: TodoItemProps) {
  const { updateTodo } = useToDos()

  function toggle() {
    console.log('toggle')
    updateTodo.mutate(
      {
        id,
        completed: !completed
      }
    )
  }

  return (
    <Card className='w-full min-h-14 px-2 py-3 bg-card2 text-card2-foreground flex flex-row justify-start items-center gap-4 border-2 border-transparent hover:border-primary'>
      <Checkbox
        className='w-7 h-7'
        checked={completed}
        onCheckedChange={toggle}
      />
      <NextLink href={`/todo/${id}`} className='w-full flex flex-1 flex-row justify-between items-center'>
        <h3 className='text-base'>{title}</h3>
        <CircleAlert className={isToday(addHours(date, (new Date().getTimezoneOffset())/60)) || isFuture(date) ? 'hidden' : ''} />
      </NextLink>
    </Card>
  )
}
