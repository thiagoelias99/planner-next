import { Budget } from './budget'

export interface BudgetSummary {
  incomes: Budget[]
  predictedIncomeValue: number
  actualIncomeValue: number
  
  outcomes: Budget[]
  predictedOutcomeValue: number
  actualOutcomeValue: number
  
  predictedBalance: number
  actualBalance: number
  
  creditCards: Budget[]
  actualCreditValue: number
  creditLimitValue: number
  
  pensions: Budget[]
  predictedPensionValue: number
  actualPensionValue: number
  
  investments: Budget[]
  predictedInvestmentsValue: number
  actualInvestmentsValue: number

  cashBoxes: Budget[]
  predictedCashBoxValue: number
  actualCashBoxValue: number
}