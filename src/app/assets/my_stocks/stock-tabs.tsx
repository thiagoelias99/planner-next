'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MyStocksSection from './my-stocks-section'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import MyReitsSection from './my-reits-section'
import useAssets from '@/hooks/assets/use-assets'
import CashBoxSection from './cash-box-section'
import FixedIncomesSection from './fixed-income'

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
      <TabsList className='bg-transparent shadow-none'>
        <CustomTabsTrigger value="cashbox">Cash Boxes</CustomTabsTrigger>
        <CustomTabsTrigger value="fixed">Fixed Incomes</CustomTabsTrigger>
        <CustomTabsTrigger value="stocks">Stocks</CustomTabsTrigger>
        <CustomTabsTrigger value="reits">REITs</CustomTabsTrigger>
        <CustomTabsTrigger value="internationals">Internationals</CustomTabsTrigger>
        <CustomTabsTrigger value="golds">Golds</CustomTabsTrigger>
        <CustomTabsTrigger value="cryptos">Cryptos</CustomTabsTrigger>
        <CustomTabsTrigger value="pension">Pensions</CustomTabsTrigger>
      </TabsList>
      <TabsContent value="stocks">
        <MyStocksSection
          isLoading={getSummary.isFetching}
          data={getSummary.data?.stocks.stocks.items}
        />
      </TabsContent>
      <TabsContent value="reits">
        <MyReitsSection
          isLoading={getSummary.isFetching}
          data={getSummary.data?.stocks.reits}
        />
      </TabsContent>
      <TabsContent value="internationals">
        <MyStocksSection
          isLoading={getSummary.isFetching}
          data={getSummary.data?.stocks.internationals.items}
        />
      </TabsContent>
      <TabsContent value="golds">
        <MyStocksSection
          isLoading={getSummary.isFetching}
          data={getSummary.data?.stocks.golds.items}
        />
      </TabsContent>
      <TabsContent value="cryptos">
        <MyStocksSection
          isLoading={getSummary.isFetching}
          data={getSummary.data?.stocks.cryptos.items}
        />
      </TabsContent>
      <TabsContent value='cashbox'>
        <CashBoxSection
          isLoading={getSummary.isFetching}
          data={getSummary.data?.fixedIncomes.cashBoxes}
        />
      </TabsContent>
      <TabsContent value='pension'>
        <CashBoxSection
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
    </Tabs>
  )
}