import React from 'react'
import AssetsContainer from './assets-container'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'

interface Props {
  className?: ClassNameValue
}

export default function AssetsSection({ className }: Props) {
  return (
    <section className={cn('', className)}>
      <AssetsContainer />
    </section>
  )
}
