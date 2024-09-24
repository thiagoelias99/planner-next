'use client'

import Currency from '@/components/ui/currency'
import useAssets from '@/hooks/assets/use-assets'
import { cn } from '@/lib/utils'
import { ClassNameValue } from 'tailwind-merge'

interface Props {
  className?: ClassNameValue
}

export default function AmountToShare({ className }: Props) {
  const { getSummary } = useAssets()

  return (
    <div className={cn('w-full flex flex-row justify-start items-baseline gap-2', className)}>
      <p className='text-muted-foreground'>Amount to share</p>
      <div role='button' className='text-lg'><Currency value={getSummary.data?.sharesTotalValue || 0} /></div>
    </div>
  )
}
