//Use a top bar for a module context

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { ClassNameValue } from 'tailwind-merge'
import { Button } from '../ui/button'

export interface ModuleLink {
  Icon: LucideIcon
  href?: string
  onClick?: () => void
  variant?: 'default' | 'secondary' | 'ghost' | 'outline' | 'destructive' | 'link'
}

export interface Props {
  links: ModuleLink[]
  className?: ClassNameValue
}

export default function ModuleBar({ className, links }: Props) {
  return (
    <section className={(cn('flex flex-row justify-end items-center gap-4', className))}>
      {links.map((link, index) => (
        <Button
          key={index}
          onClick={link.onClick}
          className="p-2"
          variant={link.variant || 'ghost'}
          size='icon'
        >
          <link.Icon size={24} />
        </Button>
      ))}
    </section>
  )
}
