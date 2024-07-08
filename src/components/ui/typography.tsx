import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'

interface Props {
  classnames?: ClassNameValue
  children?: React.ReactNode
}

const Header1 = ({ classnames, children }: Props) => {
  return (
    <h1 className={cn(
      'text-lg font-bold',
      classnames
    )}>{children}</h1>
  )
}

const Header2 = ({ classnames, children }: Props) => {
  return (
    <h2 className={cn(
      'text-base font-semibold',
      classnames
    )}>{children}</h2>
  )
}

const Header3 = ({ classnames, children }: Props) => {
  return (
    <h3 className={cn(
      'text-base font-semibold',
      classnames
    )}>{children}</h3>
  )
}

const Header4 = ({ classnames, children }: Props) => {
  return (
    <h4 className={cn(
      'text-base',
      classnames
    )}>{children}</h4>
  )
}

export { Header1, Header2, Header3, Header4 }