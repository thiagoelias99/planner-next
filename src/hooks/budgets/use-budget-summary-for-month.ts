import { useMutation, useQuery } from 'react-query'
import { useRouter } from 'next/navigation'
import useToken from '../use-token'
import axios, { AxiosError } from 'axios'
import { BudgetSummary } from '@/models/budget/budget-summary'
import { CreateBudgetDto } from './budget-create.dto'
import { UpdateTransactionDto } from './update-transaction.dto'
import { addHours } from 'date-fns'

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
        ...response
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
  }, {
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true
  }
  )

  const checkItem = useMutation({
    mutationFn: async ({ parentId, id, checked }: { parentId: string, id: string, checked: boolean }) => {
      if (!token) {
        return
      }
      try {
        await axios.patch(`${apiUrl}/budgets/${parentId}/transactions/${id}`, {
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
      const timezoneOffset = new Date().getTimezoneOffset() / 60

      const normalizedData = {
        ...data,
        startDate: data.startDate ? addHours(data.startDate, timezoneOffset) : undefined,
        endDate: data.endDate ? addHours(data.endDate, timezoneOffset) : undefined
      }

      await axios.post(`${apiUrl}/budgets`, {
        normalizedData
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })

      await getSummary.refetch()
    }
  })

  const updateBudget = useMutation({
    mutationFn: async ({ parentId, id, ...rest }: UpdateTransactionDto) => {
      if (!token) {
        return
      }
      try {
        await axios.patch(`${apiUrl}/budgets/${parentId}/transactions/${id}`, {
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
        await axios.patch(`${apiUrl}/budgets/${parentId}/transactions/${id}`, {
          deleted: true
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

  const restoreBudget = useMutation({
    mutationFn: async ({ parentId, id }: { parentId: string, id: string }) => {
      if (!token) {
        return
      }
      try {
        await axios.patch(`${apiUrl}/budgets/${parentId}/transactions/${id}`, {
          deleted: false
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

  return { getSummary, checkItem, createBudget, updateBudget, deleteBudget, restoreBudget }
}

export default useBudgetSummaryFromMonth