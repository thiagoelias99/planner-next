import React from 'react'
import TodoItem from './item'
import { ToDoItem } from '@/models/todos/todo'
import { Header1 } from '@/components/ui/typography'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'

interface ToDoSectionProps {
  title: string
  handleEdit: (todo: ToDoItem) => void
  data?: ToDoItem[]
  expanded?: boolean
  className?: ClassNameValue
}

export default function ToDoSection({ title, data = [], expanded = true, handleEdit, className }: ToDoSectionProps) {
  return (
    <section className={cn(`w-full min-w-[360px] max-w-[400px] px-2 pt-4 pb-2 bg-card rounded-md ${expanded ? '' : 'hidden'}`, className)}>
      <Header1>{title}</Header1>
      <div className='mt-2 flex flex-col justify-start items-start gap-2'>
        {data.map((todo) => (
          <TodoItem key={todo.id} handleEdit={handleEdit} {...todo} />
        ))}
      </div>
    </section>
  )
}
