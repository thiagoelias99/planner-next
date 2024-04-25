import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import useToken from './use-token'
import { BudgetSummary } from '@/models/budget/budget-summary'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const useBudgets = () => {
  const router = useRouter()
  const { token } = useToken()

  const getSummaryFromYearAndMonth = async (year: number, month: number) => {
    if (!token) {
      return
    }
    try {
      const { data: response } = await axios.get<BudgetSummary>(`${apiUrl}/budgets/summary/${year}/${month}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return {
        ...response,
        incomes: response.incomes.map((item) => ({
          ...item,
          date: new Date(item.date)
        })),
        expenses: response.outcomes.map((item) => ({
          ...item,
          date: new Date(item.date)
        }))
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 401:
            router.push('/login')
            break
          default:
            break
        }
        return
      }

      throw error
    }
  }

  return { getSummaryFromYearAndMonth }
}
