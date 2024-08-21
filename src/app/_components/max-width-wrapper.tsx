import React from 'react'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'

export default function MaxWidthWrapper({
  children,
  className
}: {
  children: React.ReactNode
  className?: ClassNameValue
}) {
  return (
    <div
      className={cn('mx-auto w-full max-w-screen-xl px-2.5 md:px-20', className)}
    >
      {children}
    </div>
  )
}
