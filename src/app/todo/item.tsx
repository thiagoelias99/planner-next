'use client'
import NextLink from 'next/link'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import useToDos from '@/hooks/todos/use-todo'
import { ToDoItem } from '@/models/todos/todo'
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'

interface TodoItemProps extends ToDoItem {
  handleEdit: (todo: ToDoItem) => void
}

export default function TodoItem({ id, title, completed, date, handleEdit, ...rest }: TodoItemProps) {
  const { updateTodo, deleteTodo } = useToDos()

  function toggle() {
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
      <div
        role='button'
        onClick={() => handleEdit({ id, title, completed, date, ...rest })}
        className='w-full flex flex-1 flex-row justify-between items-center'
      >
        <h3 className={`text-base ${completed ? 'line-through' : ''}`}>{title}</h3>
      </div>
      <Button
        className={`w-7 h-7 ${completed ? '' : 'hidden'}`}
        variant='destructive'
        size='icon'
        onClick={() => deleteTodo.mutate(id)}
      >
        <Trash2Icon size={14} />
      </Button>
    </Card>
  )
}
