'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import StocksSection from './section-stocks'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import MyReitsSection from './section-reits'
import useAssets from '@/hooks/assets/use-assets'
import CashBoxAndPensionSection from './section-cash-pension'
import FixedIncomesSection from './section-fixed-income'

export default function StockTabs() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { getSummary } = useAssets()

  function handleTabChange(value: string) {
    router.push(`${pathname}?init=${value}`)
  }

  function CustomTabsTrigger({ value, children }: { value: string, children: React.ReactNode }) {
    return (
      <TabsTrigger onClick={_ => handleTabChange(value)} className='text-lg font-bold text-card-foreground' value={value}>{children}</TabsTrigger>
    )
  }

  return (
    <Tabs defaultValue={searchParams.get('init') || 'cashbox'} className="w-full bg-card rounded-lg p-2 pt-4 mt-4">
      <TabsList className='bg-transparent shadow-0'>
        <CustomTabsTrigger value="cashbox">Cash Boxes</CustomTabsTrigger>
        <CustomTabsTrigger value="fixed">Fixed Incomes</CustomTabsTrigger>
        <CustomTabsTrigger value="stocks">Stocks</CustomTabsTrigger>
        <CustomTabsTrigger value="reits">REITs</CustomTabsTrigger>
        <CustomTabsTrigger value="internationals">Internationals</CustomTabsTrigger>
        <CustomTabsTrigger value="golds">Golds</CustomTabsTrigger>
        <CustomTabsTrigger value="cryptos">Cryptos</CustomTabsTrigger>
        <CustomTabsTrigger value="pension">Pensions</CustomTabsTrigger>
        <CustomTabsTrigger value="properties">Properties</CustomTabsTrigger>
      </TabsList>
      <TabsContent value="stocks">
        <StocksSection
          isLoading={getSummary.isFetching}
          data={getSummary.data?.stocks.stocks}
        />
      </TabsContent>
      <TabsContent value="reits">
        <MyReitsSection
          isLoading={getSummary.isFetching}
          data={getSummary.data?.stocks.reits}
        />
      </TabsContent>
      <TabsContent value="internationals">
        <StocksSection
          isLoading={getSummary.isFetching}
          data={getSummary.data?.stocks.internationals}
        />
      </TabsContent>
      <TabsContent value="golds">
        <StocksSection
          isLoading={getSummary.isFetching}
          data={getSummary.data?.stocks.golds}
        />
      </TabsContent>
      <TabsContent value="cryptos">
        <StocksSection
          isLoading={getSummary.isFetching}
          data={getSummary.data?.stocks.cryptos}
        />
      </TabsContent>
      <TabsContent value='cashbox'>
        <CashBoxAndPensionSection
          isLoading={getSummary.isFetching}
          data={getSummary.data?.fixedIncomes.cashBoxes}
        />
      </TabsContent>
      <TabsContent value='pension'>
        <CashBoxAndPensionSection
          isLoading={getSummary.isFetching}
          data={getSummary.data?.fixedIncomes.pensions}
        />
      </TabsContent>
      <TabsContent value='fixed'>
        <FixedIncomesSection
          isLoading={getSummary.isFetching}
          data={getSummary.data?.fixedIncomes.fixedIncomes}
        />
      </TabsContent>
      <TabsContent value='properties'>
        <CashBoxAndPensionSection
          isLoading={getSummary.isFetching}
          data={getSummary.data?.fixedIncomes.properties}
        />
      </TabsContent>
    </Tabs>
  )
}