import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'

interface Props {
  classnames?: ClassNameValue
  children?: React.ReactNode
}

const Header1 = ({ classnames, children }: Props) => {
  return (
    <h1 className={cn(
      'text-xl font-bold',
      classnames
    )}>{children}</h1>
  )
}

export { Header1 }