import { FixedIncomeSummary } from './fixed-income'
import { StockSummary } from './stock'

export interface AssetsSummary {
  stocks: StockSummary
  fixedIncomes: FixedIncomeSummary
  stocksTotalValue: number
  reitsTotalValue: number
  etfsTotalValue: number
  internationalsTotalValue: number
  cryptosTotalValue: number
  goldsTotalValue: number
  cashBoxesTotalValue: number
  pensionsTotalValue: number
  propertiesTotalValue: number
  fixedIncomesTotalValue: number
  currentTotalValue: number
  stocksPercentage: number
  reitsPercentage: number
  etfsPercentage: number
  internationalsPercentage: number
  cryptosPercentage: number
  goldsPercentage: number
  cashBoxesPercentage: number
  pensionsPercentage: number
  fixedIncomesPercentage: number
  propertiesPercentage: number
}