import { BudgetClass } from '@/models/budget/budget-class.enum'
import { BudgetPaymentMethod } from '@/models/budget/budget-payment-method.enum'

export interface CreateBudgetDto {
  currentValue: number
  budgetClass: BudgetClass
  description?: string
  expectedMonthDay?: number
  consolidated?: boolean
  startDate?: string
  endDate?: string
  paymentMethod?: BudgetPaymentMethod
}