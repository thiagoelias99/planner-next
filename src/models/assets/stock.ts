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

export interface StockOrder {
  id: string
  ticker: string
  companyName: string
  orderType: StockOrderType
  quantity: number
  individualPrice: number
  total: number
  createdAt: Date
  updatedAt: Date
}

export interface StockOrderCreateDto {
  ticker: string
  orderType: StockOrderType
  quantity: number
  individualPrice: number
}

export interface StockOrderUpdateDto extends StockOrderCreateDto {
  id: string
}

export interface StockSummary {
  stocks: StockSummaryClassView
  reits: StockSummaryClassView
  etfs: StockSummaryClassView
  golds: StockSummaryClassView
  cryptos: StockSummaryClassView
  internationals: StockSummaryClassView
}

export interface StockSummaryClassView {
  currentTotalValue: number
  gainsAndLosses: number
  items: StockSummaryItem[]
}

export interface StockSummaryItem extends Stock {
  quantity: number
  totalInvestedValue: number
  currentTotalValue: number
  averagePrice: number
  profitability: number
  gainsAndLosses: number
  orders: StockOrder[]
}

export enum StockType {
  STOCK = 'Stock',
  ETF = 'ETF',
  CRYPTO = 'Crypto',
  REIT = 'Reit',
  GOLD = 'Gold',
  INTERNATIONAL = 'International'
}

export enum StockOrderType {
  BUY = 'Buy',
  SELL = 'Sell'
}
