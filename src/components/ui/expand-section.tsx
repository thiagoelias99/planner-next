'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'
import { Button } from './button'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

interface ExpandSectionProps {
  label: string
  labelWhenOpen?: string
  className?: ClassNameValue
  onClick?: () => void
}

export default function ExpandSection({ label, className, onClick, labelWhenOpen = label }: ExpandSectionProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  function handleClick() {
    setIsOpen(!isOpen)
    onClick && onClick()
  }

  return (
    <div className={cn('w-full flex flex-row justify-end items-center gap-2', className)}>
      <p className='text-sm'>{isOpen ? labelWhenOpen : label}</p>
      <Button
        size='icon'
        variant='ghost'
        onClick={handleClick}
        type='button'
      >
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Button>
    </div>
  )
}
