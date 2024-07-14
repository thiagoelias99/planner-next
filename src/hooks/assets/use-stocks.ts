import { useRouter } from 'next/navigation'
import { useMutation, useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'

import { UserStock } from '@/models/user-stock'
import useToken from '../use-token'
import { Stock, StockCreateDto, StockSummary, StockUpdateDto } from '@/models/assets/stock'
import { api } from '@/services/api/api'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const useStocks = () => {
  const router = useRouter()
  const { token } = useToken()

  const getStocks = useQuery('stocks', async () => {
    try {
      const { data: response } = await axios.get<Stock[]>(`${apiUrl}/stocks`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response
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
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false
  })

  const createStock = useMutation({
    mutationFn: async (stock: StockCreateDto) => {
      await axios.post(`${apiUrl}/stocks`, stock, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      getStocks.refetch()
    }
  })

  const getSummary = useQuery({
    queryKey: 'stocksSummary',
    queryFn: async () => {
      const { data } = await api.get<StockSummary>('/stocks/summary', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return data
    },
    staleTime: 1000 * 60 * 5 // 5 minutes
  })

  const updateStock = useMutation({
    mutationFn: async (stock: StockUpdateDto) => {
      const { ticker, ...rest } = stock
      await axios.patch(`${apiUrl}/stocks/${stock.ticker}`, { ...rest }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      getStocks.refetch()
      getSummary.refetch()
    }
  })

  return { getStocks, createStock, updateStock, getSummary }
}

export default useStocks