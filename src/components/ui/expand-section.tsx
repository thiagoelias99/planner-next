import { cn } from '@/lib/utils'
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'
import { Button } from './button'
import { ChevronDownIcon } from 'lucide-react'

interface ExpandSectionProps {
  label: string
  className?: ClassNameValue
  onClick?: () => void
}

export default function ExpandSection({ label, className, onClick }: ExpandSectionProps) {
  return (
    <div className={cn('w-full flex flex-row justify-end items-center gap-2', className)}>
      <p className='text-sm'>{label}</p>
      <Button
        size='icon'
        variant='ghost'
        onClick={onClick}
      >
        <ChevronDownIcon />
      </Button>
    </div>
  )
}
