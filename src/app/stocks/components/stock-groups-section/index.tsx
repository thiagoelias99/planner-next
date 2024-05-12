import { UserStock } from '@/models/user-stock'
import StockGroupCard, { StockGroupCardProps } from '../stock-group-card'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'

interface Props {
  userStockData: UserStock
  className?: ClassNameValue
}

const StockGroupsSection = ({ userStockData, className }: Props) => {

  const labels = ['Ações', 'FIIs', 'Internacionais', 'Criptomoedas', 'Ouro']

  const stockData: StockGroupCardProps = {
    label: labels[0],
    amount: userStockData.stocks.totalAmount,
    percentage: userStockData.stocks.percentage,
    count: userStockData.stocks.count,
  }

  const fiiData: StockGroupCardProps = {
    label: labels[1],
    amount: userStockData.reits.totalAmount,
    percentage: userStockData.reits.percentage,
    count: userStockData.reits.count,
  }

  const internationalData: StockGroupCardProps = {
    label: labels[2],
    amount: userStockData.internationals.totalAmount,
    percentage: userStockData.internationals.percentage,
    count: userStockData.internationals.count,
  }

  const cryptoData: StockGroupCardProps = {
    label: labels[3],
    amount: userStockData.cryptos.totalAmount,
    percentage: userStockData.cryptos.percentage,
    count: userStockData.cryptos.count,
  }

  const goldData: StockGroupCardProps = {
    label: labels[4],
    amount: userStockData.gold.totalAmount,
    percentage: userStockData.gold.percentage,
    count: userStockData.gold.count,
  }

  return (
    <section className={cn('flex flex-row justify-start items-start flex-nowrap gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden px-4', className)}>
      <StockGroupCard {...stockData} />
      <StockGroupCard {...fiiData} />
      <StockGroupCard {...internationalData} />
      <StockGroupCard {...cryptoData} />
      <StockGroupCard {...goldData} />
    </section>
  )
}

export default StockGroupsSection