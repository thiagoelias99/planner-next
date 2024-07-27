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
  lastMonthHistoric: AssetsHistory
}

export interface AssetsHistory {
  id: string
  date: string
  stocksTotalValue: number
  reitsTotalValue: number
  etfsTotalValue: number
  internationalsTotalValue: number
  cryptosTotalValue: number
  goldsTotalValue: number
  cashBoxesTotalValue: number
  pensionsTotalValue: number
  fixedIncomesTotalValue: number
  propertiesTotalValue: number
  sharesTotalValue: number
  generalTotalValue: number
  financialInjectionsTotalValue: number
  
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
  sharesPercentage: number
  passiveGainLossesPercentage: number
  generalPercentage: number

  stocksGainLosses: number
  reitsGainLosses: number
  etfsGainLosses: number
  internationalsGainLosses: number
  cryptosGainLosses: number
  goldsGainLosses: number
  cashBoxesGainLosses: number
  pensionsGainLosses: number
  fixedIncomesGainLosses: number
  propertiesGainLosses: number
  sharesGainLosses: number
  passiveGainLosses: number
  generalGainLosses: number
}