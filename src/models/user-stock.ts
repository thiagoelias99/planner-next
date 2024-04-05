export interface UserStock {
  count:          number
  totalAmount:    number
  stocks:         StockClass
  reits:          StockClass
  internationals: StockClass
  cryptos:        StockClass
  gold:           StockClass
}

export interface StockClass {
  data:        Stock[]
  totalAmount: number
  percentage:  number
  count:       number
}

export interface Stock {
  id:                   string
  ticker:               string
  name:                 string
  type:                 StockType
  price:                number
  latestTradingDay:     Date
  stockQuantity:        number
  totalDepositValue:    number
  totalWithdrawValue:   number
  averageStockBuyPrice: number
  profitability:        number
}

export enum StockType {
  Ação = 'Ação',
  Etf = 'ETF',
  Fii = 'FII',
}
