import { useMutation, useQuery } from 'react-query'
import { useRouter } from 'next/navigation'
import useToken from '../use-token'
import axios, { AxiosError } from 'axios'
import { BudgetSummary } from '@/models/budget/budget-summary'
import { CreateBudgetDto } from './budget-create.dto'
import { UpdateBudgetDto } from './update-budget.dto'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const useBudgetSummaryFromMonth = (month: number, year: number) => {
  const { token } = useToken()
  const router = useRouter()

  const getSummary = useQuery(['summary', year, month], async () => {
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
  })

  const checkItem = useMutation({
    mutationFn: async ({ parentId, id, checked }: { parentId: string, id: string, checked: boolean }) => {
      if (!token) {
        return
      }
      try {
        await axios.patch(`${apiUrl}/budgets/${parentId}/register/${id}`, {
          checked
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })

        getSummary.refetch()
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
  })

  const createBudget = useMutation({
    mutationFn: async (data: CreateBudgetDto) => {
      if (!token) {
        return
      }
      await axios.post(`${apiUrl}/budgets`, {
        ...data
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })

      await getSummary.refetch()
    }
  })

  const updateBudget = useMutation({
    mutationFn: async ({ parentId, id, ...rest }: UpdateBudgetDto) => {
      if (!token) {
        return
      }
      try {
        await axios.patch(`${apiUrl}/budgets/${parentId}/register/${id}`, {
          ...rest
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })

        getSummary.refetch()
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
  })

  const deleteBudget = useMutation({
    mutationFn: async ({ parentId, id }: { parentId: string, id: string }) => {
      if (!token) {
        return
      }
      try {
        await axios.patch(`${apiUrl}/budgets/${parentId}/register/${id}`, {
          deleted: true
        },{
          headers: {
            Authorization: `Bearer ${token}`
          },
        })

        getSummary.refetch()
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
  })

  return { getSummary, checkItem, createBudget, updateBudget, deleteBudget }
}

export default useBudgetSummaryFromMonth