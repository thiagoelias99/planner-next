import { useMutation, useQuery } from 'react-query'
import useToken from '../use-token'
import { api } from '@/services/api/api'
import { StockOrder, StockOrderCreateDto } from '@/models/assets/stock'

const useOrders = () => {
  const { token } = useToken()

  const getStockOrders = useQuery({
    queryFn: async () => {
      const { data } = await api.get<StockOrder[]>('/stocks/orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return data
    }
  })

  const createStockOrder = useMutation({
    mutationFn: async (order: StockOrderCreateDto) => {
      const { data } = await api.post<StockOrder>('/stocks/orders', order, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      getStockOrders.refetch()

      return data
    }
  })

  return { getStockOrders, createStockOrder }
}

export default useOrders