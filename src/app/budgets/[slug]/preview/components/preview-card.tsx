import { Card } from '@/components/ui/card'
import { Header1 } from '@/components/ui/typography'
import { formatCurrency } from '@/lib/format-currency'
import { DollarSignIcon, LucideIcon } from 'lucide-react'
import React from 'react'

interface PreviewCardProps {
  title: string
  Icon: LucideIcon
  subTitles: { title: string, value: number }[]
}

export default function PreviewCard({title, Icon, subTitles} : PreviewCardProps) {
  return (
    <Card className='p-2'>
      <div className='flex flex-row justify-between items-center'>
        <Header1>{title}</Header1>
        <Icon size={32} />
      </div>
      <div className='flex flex-row justify-between items-end'>
        {subTitles.map((subTitle, index) => (
          <Item key={index} title={subTitle.title} value={subTitle.value} />
        ))}
      </div>
    </Card>
  )
}

interface ItemProps {
  title: string
  value: number
}

function Item({ title, value }: ItemProps) {
  return (
    <div>
      <span className='text-xs font-semibold'>{title}</span>
      <p className="text-2xl font-semibold">{formatCurrency(value)}</p>
    </div>
  )
}