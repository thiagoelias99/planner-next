import { CreateBudgetDto } from './budget-create.dto'

export interface UpdateTransactionDto extends Partial<CreateBudgetDto> {
  parentId: string
  id: string
  value: number
}