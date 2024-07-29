import { Card, Card2, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatCurrency } from '@/lib/format-currency'
import { formatPercentage } from '@/lib/format-percentage'
import { Loader2Icon } from 'lucide-react'

interface Props {
  title: string
  value: number | undefined
  percentage?: number | undefined
  children?: React.ReactNode
  isLoading: boolean
}

export default function AssetCard({ title, value, percentage, children, isLoading }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <Card2 className='w-full flex flex-col justify-center items-center gap-1 px-2 py-3'>
        {isLoading ? (
          <Loader2Icon className='animate-spin' />) : (
          <div className='text-lg font-semibold flex justify-center items-center gap-2'>
            <p >{formatCurrency(value)}</p>
            {percentage !== undefined && (
              <p>({formatPercentage(percentage)})</p>
            )}
          </div>
        )}
        {children}
      </Card2>
    </Card>
  )
}