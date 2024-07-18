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
  sharesTotalValue: number
  fixedIncomesTotalValue: number
  currentTotalValue: number
  stocksPercentage: number
  stocksPercentagePlanned: number
  stocksAdjust: number
  reitsPercentage: number
  reitsPercentagePlanned: number
  reitsAdjust: number
  etfsPercentage: number
  etfsPercentagePlanned: number
  etfsAdjust: number
  internationalsPercentage: number
  internationalsPercentagePlanned: number
  internationalsAdjust: number
  cryptosPercentage: number
  cryptosPercentagePlanned: number
  cryptosAdjust: number
  goldsPercentage: number
  goldsPercentagePlanned: number
  goldsAdjust: number
  cashBoxesPercentage: number
  cashBoxesPercentagePlanned: number
  cashBoxesAdjust: number
  pensionsPercentage: number
  pensionsPercentagePlanned: number
  pensionsAdjust: number
  fixedIncomesPercentage: number
  fixedIncomesPercentagePlanned: number
  fixedIncomesAdjust: number
  propertiesPercentage: number
  propertiesPercentagePlanned: number
  propertiesAdjust: number
  sharesPercentage: number
  sharesPercentagePlanned: number
  sharesAdjust: number
}