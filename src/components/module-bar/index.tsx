import NextLink from 'next/link'

import { cn } from '@/lib/utils'
import { ArrowLeftIcon } from 'lucide-react'
import { ClassNameValue } from 'tailwind-merge'

export interface Props {
  title?: string
  backHref?: string
  children?: React.ReactNode
  className?: ClassNameValue
}

export default function ModuleBar({ className, backHref, title, children }: Props) {
  return (
    <section className={(cn('flex flex-row justify-between items-center', className))}>
      <div className='flex justify-start items-start gap-4'>
        {backHref && (
          <NextLink href={backHref}>
            <ArrowLeftIcon size={24} className='cursor-pointer' />
          </NextLink>
        )}
        <h1 className='text-lg font-bold'>{title}</h1>
      </div>
      <div className='flex items-center gap-4'>
        {children}
      </div>
    </section>
  )
}
