export interface Stock {
  ticker: string
  name: string
  price: number
  open: number
  changePercent: number
  stockType: string
  updatedAt: Date
}

export interface StockCreateDto {
  ticker: string
  name: string
  price: number
  stockType: StockType
}

export enum StockType {
  STOCK = 'Stock',
  ETF = 'ETF',
  CRYPTO = 'Crypto',
  REIT = 'Reit',
  GOLD = 'Gold',
  INTERNATIONAL = 'International'
}
