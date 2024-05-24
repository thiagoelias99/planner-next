export interface AssetHistoryItem {
  grossValue: number
  difference: number
  percentage: number
}

export interface AssetHistory {
  startDate: Date
  endDate: Date
  stocks: AssetHistoryItem
  reits: AssetHistoryItem
  internationals: AssetHistoryItem
  cryptos: AssetHistoryItem
  gold: AssetHistoryItem
  general: AssetHistoryItem
}