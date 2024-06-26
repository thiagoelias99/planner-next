'use client'

import useToDos from '@/hooks/todos/use-todo'
import ModuleBar, { ModuleLink } from '@/components/module-bar'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ToDoSection from './todos-section'
import ExpandSection from '@/components/ui/expand-section'
import CreateTodoDialog from './create-dialog'
import { useState } from 'react'
import { addDays, addHours, isAfter, isBefore, isPast, isToday, isTomorrow } from 'date-fns'

export default function TodoPage() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false)
  const [expandCompleted, setExpandCompleted] = useState(false)
  const { getToDos } = useToDos()
  const router = useRouter()

  const moduleBarLinks: ModuleLink[] = [
    {
      Icon: PlusIcon,
      variant: 'default',
      onClick: () => setOpenCreateDialog(true)
    }
  ]

  return (
    <div className='p-4 max-w-[720px] m-auto'>
      <ModuleBar
        links={moduleBarLinks}
        backFunction={() => router.push('/')}
      />
      <div className='w-full mt-2 flex flex-col justify-start items-start gap-4'>
        <ToDoSection
          title='Hoje'
          data={getToDos.data?.items.filter(todo => (!todo.completed && isPast(todo.date) || (todo.completed && isToday(addHours(todo.date, (new Date().getTimezoneOffset()) / 60))))).sort((a, b) => isBefore(a.date, b.date) ? -1 : 1)}
        />
        <ToDoSection
          title='Amanhã'
          data={getToDos.data?.items.filter(todo => !todo.completed && isTomorrow(addHours(todo.date, 12)) && !isToday(addHours(todo.date, (new Date().getTimezoneOffset()) / 60))).sort((a, b) => isBefore(a.date, b.date) ? -1 : 1)} />
        <ToDoSection
          title='Em breve'
          data={getToDos.data?.items.filter(todo => !todo.completed && isAfter(todo.date, addDays(new Date(), 1))).sort((a, b) => isBefore(a.date, b.date) ? -1 : 1)} />
        <ExpandSection className='mt-2' label='concluídos' onClick={() => setExpandCompleted((curr) => !curr)} />
        <ToDoSection
          title='Concluídos'
          expanded={expandCompleted}
          data={getToDos.data?.items.filter(todo => todo.completed).sort((a, b) => isBefore(a.date, b.date) ? -1 : 1)} />
      </div>
      <CreateTodoDialog open={openCreateDialog} onOpenChange={setOpenCreateDialog} />
    </div>
  )
}
