import { BudgetClass } from './budget-class.enum'
import { BudgetPaymentMethod } from './budget-payment-method.enum'

export interface Budget {
  id: string;
  description: string;
  currentValue: number;
  expectedMonthDay: number;
  startDate: Date;
  endDate: Date;
  budgetClass: BudgetClass;
  paymentMethod: BudgetPaymentMethod;
  createdAt: Date;
  updatedAt: Date;
  transactions: BudgetTransaction[];
}

export interface BudgetTransaction {
  id: string;
  value: number;
  date: Date;
  checked: boolean;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}
