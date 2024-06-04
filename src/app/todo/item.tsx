'use client'
import NextLink from 'next/link'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import useToDos from '@/hooks/todos/use-todo'
import { ToDoItem } from '@/models/todos/todo'

interface TodoItemProps extends ToDoItem {

}

export default function TodoItem({ id, title, description, completed }: TodoItemProps) {
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
    <Card className='w-full h-[88px] p-4 flex flex-row justify-start items-center gap-4 hover:bg-primary'>
      <Checkbox
        className='w-7 h-7'
        checked={completed}
        onCheckedChange={toggle}
      />
      <NextLink href={`/todo/${id}`} className='w-full flex flex-1 flex-col justify-start items-start gap-1'>
        {/* <div className='w-full flex flex-1 flex-col justify-start items-start gap-1'> */}
        <h3 className='text-lg font-bold'>{title}</h3>
        <p className='w-full text-sm line-clamp-2'>{description}</p>
        {/* </div> */}
      </NextLink>
    </Card>
  )
}
