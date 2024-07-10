import { useQuery } from 'react-query'
import useToken from '../use-token'
import { api } from '@/services/api/api'
import { StockOrder } from '@/models/assets/stock'

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

  return { getStockOrders }
}

export default useOrders