export interface CashBoxPension {
  id: string
  description: string
  value: number
  type: CashBoxAndPensionType
  createdAt: Date
  updatedAt: Date
}

export enum CashBoxAndPensionType {
  CASH_BOX = 'Cash box',
  PENSION = 'Pension'
}

export interface FixedIncome {
  id: string
  description: string
  initialInvestment: number
  initialDate: Date
  dueDate: Date
  currentValue: number
  fixedRate: number
  posFixedIndex: PosFixedIndexType
  pastDays: number
  remainingDays: number
  taxRate: number
  realValue: number
  profitability: number
  gainsAndLosses: number
  createdAt: Date
  updatedAt: Date
}

export enum PosFixedIndexType {
  NONE = 'None',
  CDI = 'CDI',
  IPCA = 'IPCA',
  SELIC = 'SELIC',
  IGPM = 'IGPM'
}

export interface FixedIncomeSummary {
  totalCashBoxesValue: number
  totalPensionsValue: number
  totalFixedIncomeValue: number
  totalCurrentValue: number
  cashBoxes: CashBoxPension[]
  pensions: CashBoxPension[]
  fixedIncomes: FixedIncome[]
}