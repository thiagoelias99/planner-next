'use client'

import useToDos from '@/hooks/todos/use-todo'
import { Header1 } from '@/components/ui/typography'
import ModuleBar, { ModuleLink } from '@/components/module-bar'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ToDoSection from './todos-section'
import ExpandSection from '@/components/ui/expand-section'

export default function TodoPage() {
  const { getToDos } = useToDos()
  const router = useRouter()

  const moduleBarLinks: ModuleLink[] = [
    {
      Icon: PlusIcon,
      variant: 'default'
    }
  ]

  return (
    <div className='p-4 max-w-[720px] m-auto'>
      <ModuleBar
        links={moduleBarLinks}
        backFunction={() => router.push('/')}
      />
      <Header1>{`Meus To-Dos (${getToDos.data?.count})`}</Header1>
      <ToDoSection data={getToDos.data?.items} />
      <ExpandSection className='mt-2' label='concluídos' />
      <ToDoSection />
    </div>
  )
}
