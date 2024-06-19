'use client'

import useToDos from '@/hooks/todos/use-todo'
import { Header1 } from '@/components/ui/typography'
import ModuleBar, { ModuleLink } from '@/components/module-bar'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ToDoSection from './todos-section'
import ExpandSection from '@/components/ui/expand-section'
import CreateTodoDialog from './create-dialog'
import { useState } from 'react'
import { isBefore, isFuture, isPast, isSameDay, isToday } from 'date-fns'

export default function TodoPage() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false)
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
      <Header1>{`Hoje / Atrasados (${getToDos.data?.count})`}</Header1>
      <ToDoSection data={getToDos.data?.items.filter(todo => (!todo.completed && isPast(todo.date) || (todo.completed && isToday(todo.date))))} />
      <Header1 classnames='mt-4'>{`Em breve (${getToDos.data?.count})`}</Header1>
      <ToDoSection data={getToDos.data?.items.filter(todo => !todo.completed && isFuture(todo.date))}/>
      <ExpandSection className='mt-2' label='concluídos' />
      {/* <ToDoSection data={getToDos.data?.items.filter(todo => todo.completed )}/> */}
      <CreateTodoDialog open={openCreateDialog} onOpenChange={setOpenCreateDialog} />
    </div>
  )
}
