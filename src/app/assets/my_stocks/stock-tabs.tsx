'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MyStocksSection from './my-stocks-section'
import useStocks from '@/hooks/assets/use-stocks'
import { useSearchParams } from 'next/navigation'

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
          data={getSummary.data?.stocks.items}
        />
      </TabsContent>
      <TabsContent value="reits">
        <MyStocksSection
          data={getSummary.data?.reits.items}
        />
      </TabsContent>
      <TabsContent value="internationals">
        <MyStocksSection
          data={getSummary.data?.internationals.items}
        />
      </TabsContent>
      <TabsContent value="golds">
        <MyStocksSection
          data={getSummary.data?.golds.items}
        />
      </TabsContent>
      <TabsContent value="cryptos">
        <MyStocksSection
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
