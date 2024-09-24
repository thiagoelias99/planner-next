'use client'

import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import NextLink from 'next/link'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { isBefore, isToday, isTomorrow, startOfToday } from 'date-fns'
import { useEffect, useState } from 'react'
import useToDos from '@/hooks/todos/use-todo'
import { ToDoItem } from '@/models/todos/todo'
import TodoItem from '../todo/item'
import EditTodoDialog from '../todo/edit-dialog'

interface Props {
  className?: ClassNameValue
}

export default function ToDosSection({ className }: Props) {
  const { getToDos } = useToDos()

  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ToDoItem | undefined>(undefined)
  const [todayTodos, setTodayTodos] = useState<ToDoItem[]>([])
  const [tomorrowTodos, setTomorrowTodos] = useState<ToDoItem[]>([])

  function handleEdit(todo: ToDoItem) {
    setSelectedItem(todo)
    setOpenEditDialog(true)
  }

  useEffect(() => {
    if (getToDos.data) {
      const _todayTodos = getToDos.data.items.filter(todo => isToday(todo.date) || (isBefore(todo.date, startOfToday()) && !todo.completed))
      const _tomorrowTodos = getToDos.data.items.filter(todo => isTomorrow(todo.date))

      // Sort by title
      _todayTodos.sort((a, b) => a.title.localeCompare(b.title))
      _tomorrowTodos.sort((a, b) => a.title.localeCompare(b.title))

      setTodayTodos(_todayTodos)
      setTomorrowTodos(_tomorrowTodos)
    }
  }, [getToDos.data])

  return (
    <section className={cn('', className)}>
      <Card>
        <CardHeader className='pt-0'>
          <NextLink href='/todo'>
            <CardTitle>Todos</CardTitle>
          </NextLink>
          <Button size='icon' onClick={() => {
            setSelectedItem(undefined)
            setOpenEditDialog(true)
          }}>
            <PlusIcon />
          </Button>
        </CardHeader>
        <CardContent className='space-y-2'>
          {todayTodos.map(todo => (
            <TodoItem
              key={todo.id}
              {...todo}
              handleEdit={handleEdit}
            />
          ))}
          {todayTodos.length === 0 && (
            <p className='text-gray-500'>No todos for today</p>
          )}
          <CardTitle className='pt-4'>Tomorrow</CardTitle>
          {tomorrowTodos.map(todo => (
            <TodoItem
              key={todo.id}
              {...todo}
              handleEdit={handleEdit}
            />
          ))}
          {tomorrowTodos.length === 0 && (
            <p className='text-gray-500'>No todos for tomorrow</p>
          )}
        </CardContent>
      </Card>
      <EditTodoDialog
        open={openEditDialog}
        selectedTodo={selectedItem}
        onOpenChange={setOpenEditDialog} />
    </section>
  )
}