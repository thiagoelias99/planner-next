import { BudgetPaymentMethodEnum } from './budget-payment-method.enum'

export interface BudgetSimplified {
  id: string
  parentId: string
  description: string
  value: number
  date: Date
  isChecked: boolean
  paymentMethod: BudgetPaymentMethodEnum
  deleted: boolean
}