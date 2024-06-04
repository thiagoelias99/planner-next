import React from 'react'
import TodoItem from './item'
import { ToDoItem } from '@/models/todos/todo'

interface ToDoSectionProps {
  data?: ToDoItem[]
}

export default function ToDoSection({ data = [] }: ToDoSectionProps) {
  return (
    <section className='mt-2 flex flex-col justify-start items-start gap-2'>
      {data.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </section>
  )
}
