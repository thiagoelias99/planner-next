'use client'

import useToDos from '@/hooks/todos/use-todo'
import ModuleBar, { ModuleLink } from '@/components/module-bar'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ToDoSection from './todos-section'
import ExpandSection from '@/components/ui/expand-section'
import EditTodoDialog from './edit-dialog'
import { useState } from 'react'
import { addDays, addHours, isAfter, isBefore, isPast, isToday, isTomorrow } from 'date-fns'
import { ToDoItem } from '@/models/todos/todo'

export default function TodoPage() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false)
  const [expandCompleted, setExpandCompleted] = useState(false)
  const [selectedToDo, setSelectedToDo] = useState<ToDoItem | undefined>(undefined)
  const { getToDos } = useToDos()
  const router = useRouter()

  const moduleBarLinks: ModuleLink[] = [
    {
      Icon: PlusIcon,
      variant: 'default',
      onClick: () => {
        setSelectedToDo(undefined)
        setOpenCreateDialog(true)
      }
    }
  ]

  function handleEdit(todo: ToDoItem) {
    setSelectedToDo(todo)
    setOpenCreateDialog(true)
  }

  return (
    <div className='p-4 max-w-[720px] m-auto'>
      <ModuleBar
        links={moduleBarLinks}
        backFunction={() => router.push('/')}
      />
      <div className='w-full mt-2 flex flex-col justify-start items-start gap-4'>
        <ToDoSection
          title='Hoje'
          handleEdit={handleEdit}
          data={getToDos.data?.items.filter(todo => (!todo.completed && isPast(todo.date) || (todo.completed && isToday(addHours(todo.date, (new Date().getTimezoneOffset()) / 60))))).sort((a, b) => isBefore(a.date, b.date) ? -1 : 1)}
        />
        <ToDoSection
          title='Amanhã'
          handleEdit={handleEdit}
          data={getToDos.data?.items.filter(todo => !todo.completed && isTomorrow(addHours(todo.date, 12)) && !isToday(addHours(todo.date, (new Date().getTimezoneOffset()) / 60))).sort((a, b) => isBefore(a.date, b.date) ? -1 : 1)} />
        <ToDoSection
          title='Em breve'
          handleEdit={handleEdit}
          data={getToDos.data?.items.filter(todo => !todo.completed && isAfter(todo.date, addDays(new Date(), 1))).sort((a, b) => isBefore(a.date, b.date) ? -1 : 1)} />
        <ExpandSection className='mt-2' label='concluídos' onClick={() => setExpandCompleted((curr) => !curr)} />
        <ToDoSection
          title='Concluídos'
          handleEdit={handleEdit}
          expanded={expandCompleted}
          data={getToDos.data?.items.filter(todo => todo.completed).sort((a, b) => isBefore(a.date, b.date) ? -1 : 1)} />
      </div>
      <EditTodoDialog
        open={openCreateDialog}
        selectedTodo={selectedToDo}
        onOpenChange={setOpenCreateDialog} />
    </div>
  )
}
