//Use a top bar for a module context

import { cn } from '@/lib/utils'
import { ArrowLeftIcon, LucideIcon } from 'lucide-react'
import { ClassNameValue } from 'tailwind-merge'
import { Button } from '../ui/button'

export interface ModuleLink {
  Icon: LucideIcon
  href?: string
  onClick?: () => void
  variant?: 'default' | 'secondary' | 'ghost' | 'outline' | 'destructive' | 'link'
}

export interface Props {
  links?: ModuleLink[]
  className?: ClassNameValue
  reverse?: boolean
  backFunction?: () => void
}

export default function ModuleBar({ className, links, reverse = false, backFunction }: Props) {
  return (
    <section className={(cn('flex flex-row justify-between items-center', className))}>
      <ArrowLeftIcon size={24} onClick={backFunction} className={`cursor-pointer ${backFunction ? '' : 'invisible'}`} />
      <div className={`flex ${reverse ? 'flex-row-reverse justify-start' : 'flex-row justify-end'} items-center gap-4`}>
        {links?.map((link, index) => (
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
      </div>
    </section>
  )
}
