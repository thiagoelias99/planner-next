import { useRouter } from 'next/navigation'
import { useMutation, useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'

import { UserStock } from '@/models/user-stock'
import useToken from '../use-token'
import { Stock, StockCreateDto, StockSummary } from '@/models/assets/stock'
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


  // const getStocksFromUser = useQuery('stocksFromUser', async () => {
  //   if (!token) {
  //     return
  //   }
  //   try {
  //     const { data: response } = await axios.get<UserStock>(`${apiUrl}/stocks`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })

  //     return response
  //   } catch (error) {
  //     if (error instanceof AxiosError) {
  //       switch (error.response?.status) {
  //         case 401:
  //           router.push('/login')
  //           break
  //         default:
  //           break
  //       }
  //       return
  //     }

  //     throw error
  //   }
  // })

  return { getStocks, createStock, getSummary }
}

export default useStocks