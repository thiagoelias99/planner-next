'use client'

import { DollarSignIcon, DiamondPercentIcon, WalletIcon, CreditCardIcon, HandCoinsIcon, GemIcon, PiggyBankIcon } from 'lucide-react'
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
      <div className='w-full max-w-[1024px] m-auto px-4 grid grid-flow-row sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <PreviewCard
          title='Renda'
          Icon={DollarSignIcon}
          subTitles={[
            { title: 'Previsto', value: summary?.predictedIncomeValue || 0 },
            { title: 'Atual', value: summary?.actualIncomeValue || 0 },
          ]}
        />
        <PreviewCard
          title='Despesas'
          Icon={DiamondPercentIcon}
          subTitles={[
            { title: 'Previsto', value: summary?.predictedOutcomeValue || 0 },
            { title: 'Atual', value: summary?.actualOutcomeValue || 0 },
          ]}
        />
        <PreviewCard
          title='Cartão de Crédito'
          Icon={CreditCardIcon}
          subTitles={[
            { title: 'Limite', value: summary?.creditLimitValue || 0 },
            { title: 'Atual', value: summary?.actualCreditValue || 0 }
          ]}
        />
        <PreviewCard
          title='Previdência'
          Icon={HandCoinsIcon}
          subTitles={[
            { title: 'Previsto', value: summary?.predictedPensionValue || 0 },
            { title: 'Atual', value: summary?.actualPensionValue || 0 },
          ]}
        />
        <PreviewCard
          title='Investimentos'
          Icon={GemIcon}
          subTitles={[
            { title: 'Previsto', value: summary?.predictedInvestmentsValue || 0 },
            { title: 'Atual', value: summary?.actualInvestmentsValue || 0 },
          ]}
        />
        <PreviewCard
          title='Caixas'
          Icon={PiggyBankIcon}
          subTitles={[
            { title: 'Previsto', value: summary?.predictedCashBoxValue || 0 },
            { title: 'Atual', value: summary?.actualCashBoxValue || 0 },
          ]}
        />
      </div>
    </div>
  )
}