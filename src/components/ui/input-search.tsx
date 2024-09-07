import { Search } from 'lucide-react'
import React from 'react'
import { Input, InputProps } from './input'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'

interface Props extends InputProps {
  containerClassName?: ClassNameValue
}

export default function InputSearch({ containerClassName, ...rest }: Props) {
  return (
    <div className={cn('relative ml-auto flex-1 md:grow-0', containerClassName)}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        {...rest}
      />
    </div>
  )
}
