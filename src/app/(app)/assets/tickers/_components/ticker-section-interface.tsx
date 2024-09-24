import { Stock } from '@/models/assets/stock'

export default interface ITickerSection {
  stocks: Stock[],
  handleItemClick: (stock: Stock) => void
}