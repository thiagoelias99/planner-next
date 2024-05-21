import { BudgetClassEnum } from '@/models/budget/budget-class-enum'
import { BudgetPaymentMethodEnum } from '@/models/budget/budget-payment-method.enum'

export interface CreateBudgetDto {
  value: number
  // isIncome?: boolean
  budgetClass: BudgetClassEnum
  description?: string
  expectedDay?: number
  consolidated?: boolean
  startDate?: string
  endDate?: string
  paymentMethod?: BudgetPaymentMethodEnum
}