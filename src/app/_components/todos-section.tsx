'use client'

import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import NextLink from 'next/link'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { getDate, getMonth, getYear, isBefore, isToday, isTomorrow, startOfToday } from 'date-fns'
import { Budget } from '@/models/budget/budget'
import useBudgetSummaryFromMonth from '@/hooks/budgets/use-budget-summary-for-month'
import { useEffect, useState } from 'react'
import BudgetItem from '../budgets/[slug]/components/income-expense-section/budget-item'
import CreateBudgetDialog from '../budgets/[slug]/components/edit-dialog'
import useToDos from '@/hooks/todos/use-todo'
import { ToDoItem } from '@/models/todos/todo'
import TodoItem from '../todo/item'
import EditTodoDialog from '../todo/edit-dialog'

interface Props {
  className?: ClassNameValue
}

export default function ToDosSection({ className }: Props) {
  const { getToDos, updateTodo } = useToDos()

  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ToDoItem | undefined>(undefined)

  function handleEdit(todo: ToDoItem) {
    setSelectedItem(todo)
    setOpenEditDialog(true)
  }

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
          {getToDos.data?.items.filter(todo => (isToday(todo.date) || isBefore(todo.date, startOfToday()))).map(todo => (
            <TodoItem
              key={todo.id}
              {...todo}
              handleEdit={handleEdit}
            />
          ))}
          <CardTitle>Tomorrow</CardTitle>
          {getToDos.data?.items.filter(todo => isTomorrow(todo.date)).map(todo => (
            <TodoItem
              key={todo.id}
              {...todo}
              handleEdit={handleEdit}
            />
          ))}
        </CardContent>
      </Card>
      <EditTodoDialog
        open={openEditDialog}
        selectedTodo={selectedItem}
        onOpenChange={setOpenEditDialog} />
    </section>
  )
}
