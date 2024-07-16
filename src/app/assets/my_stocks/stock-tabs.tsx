'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MyStocksSection from './my-stocks-section'
import { useSearchParams } from 'next/navigation'
import MyReitsSection from './my-reits-section'
import useAssets from '@/hooks/assets/use-assets'

export default function StockTabs() {
  const searchParams = useSearchParams()
  const { getSummary } = useAssets()

  return (
    <Tabs defaultValue={searchParams.get('init') || 'stocks'} className="w-full bg-card rounded-lg p-2 pt-4 mt-4">
      <TabsList className='bg-transparent'>
        <CustomTabsTrigger value="stocks">Stocks</CustomTabsTrigger>
        <CustomTabsTrigger value="reits">REITs</CustomTabsTrigger>
        <CustomTabsTrigger value="internationals">Internationals</CustomTabsTrigger>
        <CustomTabsTrigger value="golds">Golds</CustomTabsTrigger>
        <CustomTabsTrigger value="cryptos">Cryptos</CustomTabsTrigger>
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
    </Tabs>
  )
}

function CustomTabsTrigger({ value, children }: { value: string, children: React.ReactNode }) {
  return (
    <TabsTrigger className='text-lg font-bold text-card-foreground' value={value}>{children}</TabsTrigger>
  )
}