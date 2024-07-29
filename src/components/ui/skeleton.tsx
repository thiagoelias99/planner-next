import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-foreground opacity-10 text-transparent', className)}
      {...props}
    />
  )
}

export { Skeleton }
