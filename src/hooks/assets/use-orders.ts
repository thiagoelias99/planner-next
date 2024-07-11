import { useMutation, useQuery } from 'react-query'
import useToken from '../use-token'
import { api } from '@/services/api/api'
import { StockOrder, StockOrderCreateDto, StockOrderUpdateDto } from '@/models/assets/stock'

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

  const updateStockOrder = useMutation({
    mutationFn: async (order: StockOrderUpdateDto) => {
      const { id, individualPrice, orderType, quantity } = order

      const { data } = await api.patch<StockOrder>(`/stocks/orders/${id}`, {
        orderType,
        quantity,
        individualPrice
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      getStockOrders.refetch()

      return data
    }
  })

  const deleteStockOrder = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/stocks/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      getStockOrders.refetch()
    }
  })

  return { getStockOrders, createStockOrder, updateStockOrder, deleteStockOrder }
}

export default useOrders