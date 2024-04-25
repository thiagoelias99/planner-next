import { BudgetSimplified } from './budget-simplified'

export interface BudgetSummary {
  incomes: BudgetSimplified[]
  outcomes: BudgetSimplified[]
  predictedIncomeValue: number
  predictedOutcomeValue: number
  predictedBalance: number
  actualIncomeValue: number
  actualOutcomeValue: number
  actualBalance: number
}