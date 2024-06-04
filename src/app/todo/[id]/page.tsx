'use client'

import ModuleBar, { ModuleLink } from '@/components/module-bar'
import { Header1 } from '@/components/ui/typography'
import { useToast } from '@/components/ui/use-toast'
import useToDos from '@/hooks/todos/use-todo'
import { Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface TodoDetailsProps {
  params: {
    id?: string
  }
}

export default function TodoDetails({ params }: TodoDetailsProps) {
  const { getToDos, deleteTodo } = useToDos()
  const todo = getToDos.data?.items.find((todo) => todo.id === params.id)
  const { toast } = useToast()
  const router = useRouter()

  const moduleBarLinks: ModuleLink[] = [
    {
      Icon: Trash2Icon,
      variant: 'destructive',
      onClick: async () => {
        if (params.id) {
          await deleteTodo.mutate(params.id)
          toast({ description: 'To-Do deletado com sucesso', variant: 'destructive', duration: 1500})
          router.push('/todo')
        }
      }
    }
  ]

  return (
    <div className='w-full p-4 max-w-[720px] m-auto'>
      <ModuleBar
        links={moduleBarLinks}
        backFunction={() => router.push('/todo')}
      />
      <Header1>{todo?.title}</Header1>
      <p className=''>{todo?.description}</p>
    </div>
  )
}
