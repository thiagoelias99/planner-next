import { GraphSection } from './components/graph-section'
import StockGroupsSection from './components/stock-groups-section'
import StocksSection from './components/stocks-section'


export default function Stocks() {
  return (
    <main className='flex flex-col gap-4'>
      <GraphSection />
      <StockGroupsSection />
      <StocksSection />
    </main>
  )
} 