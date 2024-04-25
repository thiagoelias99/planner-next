import { LucideIcon } from 'lucide-react'
import React from 'react'
import { PlusIcon } from 'lucide-react'

interface Props {
  Icon?: LucideIcon
  onClick?: () => void
}

export default function FloatingActionButton({ Icon, onClick }: Props) {
  return (
    <button
      className='fixed right-8 bottom-8 bg-foreground w-14 h-14 flex justify-center items-center rounded-full shadow'
      onClick={onClick}
    >
      {Icon ? <Icon className='text-red-50' /> : <PlusIcon className='stroke-background' />}
    </button>
  )
}
