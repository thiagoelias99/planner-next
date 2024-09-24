import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingTablePlaceholder() {
  return (
    <div className='w-full space-y-4 rounded-lg p-4'>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <div key={index} className='w-full flex justify-between'>
          <Skeleton className='w-56 h-12' />
          <Skeleton className='w-48 h-12' />
          <Skeleton className='w-36 h-12' />
          <Skeleton className='w-40 h-12' />
        </div>
      ))}
    </div>
  )
}