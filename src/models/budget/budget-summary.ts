import { BudgetSimplified } from './budget-simplified'

export interface BudgetSummary {
  incomes: BudgetSimplified[]
  predictedIncomeValue: number
  actualIncomeValue: number
  
  outcomes: BudgetSimplified[]
  predictedOutcomeValue: number
  actualOutcomeValue: number
  
  predictedBalance: number
  actualBalance: number
  
  creditCards: BudgetSimplified[]
  actualCreditValue: number
  creditLimitValue: number
  
  pensions: BudgetSimplified[]
  predictedPensionValue: number
  actualPensionValue: number
  
  investments: BudgetSimplified[]
  predictedInvestmentsValue: number
  actualInvestmentsValue: number

  cashBoxes: BudgetSimplified[]
  predictedCashBoxValue: number
  actualCashBoxValue: number
}