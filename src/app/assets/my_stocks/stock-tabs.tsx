'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MyStocksSection from './my-stocks-section'
import useStocks from '@/hooks/assets/use-stocks'
import { useSearchParams } from 'next/navigation'
import MyReitsSection from './my-reits-section'

export default function StockTabs() {
  const searchParams = useSearchParams()
  const { getSummary } = useStocks()

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
          data={getSummary.data?.stocks.items}
        />
      </TabsContent>
      <TabsContent value="reits">
        <MyReitsSection
          isLoading={getSummary.isFetching}
          data={getSummary.data?.reits}
        />
      </TabsContent>
      <TabsContent value="internationals">
        <MyStocksSection
          isLoading={getSummary.isFetching}
          data={getSummary.data?.internationals.items}
        />
      </TabsContent>
      <TabsContent value="golds">
        <MyStocksSection
          isLoading={getSummary.isFetching}
          data={getSummary.data?.golds.items}
        />
      </TabsContent>
      <TabsContent value="cryptos">
        <MyStocksSection
          isLoading={getSummary.isFetching}
          data={getSummary.data?.cryptos.items}
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