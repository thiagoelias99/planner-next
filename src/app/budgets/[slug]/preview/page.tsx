'use client'

import { DollarSignIcon, DiamondPercentIcon, WalletIcon } from 'lucide-react'
import PreviewCard from './components/preview-card'
import useBudgetSummaryFromMonth from '@/hooks/budgets/use-budget-summary-for-month'
import ModuleBar, { ModuleLink } from '@/components/module-bar'
import useToken from '@/hooks/use-token'
import { useRouter } from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
}

export default function MonthPreview({ params }: Props) {
  const [year, month] = params.slug.split('-').map((value) => parseInt(value))
  const { getSummary } = useBudgetSummaryFromMonth(month, year)
  // Token is required to access this page
  const { token } = useToken()
  const router = useRouter()

  const summary = getSummary.data

  const moduleBarLinks: ModuleLink[] = [
    {
      Icon: WalletIcon,
      onClick: () => { router.push(`/budgets/${params.slug}`) },
      variant: 'default',
    }
  ]

  return (
    <div className=''>
      <ModuleBar
        links={moduleBarLinks}
        backFunction={() => router.push(`/budgets/${params.slug}`)}
        className='p-4'
      />
      <div className='w-full px-4 grid grid-flow-row sm:grid-flow-col sm:grid-cols-4 gap-4'>
        <PreviewCard
          title='Renda'
          Icon={DollarSignIcon}
          subTitles={[
            { title: 'Atual', value: summary?.actualIncomeValue || 0 },
            { title: 'Previsto', value: summary?.predictedIncomeValue || 0 }
          ]}
        />
        <PreviewCard
          title='Despesas'
          Icon={DiamondPercentIcon}
          subTitles={[
            { title: 'Atual', value: summary?.actualOutcomeValue || 0 },
            { title: 'Previsto', value: summary?.predictedOutcomeValue || 0 }
          ]}
        />
      </div>
    </div>
  )
}