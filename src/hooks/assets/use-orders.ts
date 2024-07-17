import { useMutation, useQuery } from 'react-query'
import useToken from '../use-token'
import { api } from '@/services/api/api'
import { StockOrder, StockOrderCreateDto, StockOrderUpdateDto } from '@/models/assets/stock'
import { queryClient } from '@/services/webclient/queryClient'
import { CashBoxPension, CashBoxPensionCreateDto, CashBoxPensionUpdateDto } from '@/models/assets/fixed-income'

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
    },
    staleTime: 1000 * 60 * 5 // 5 minutes
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

  const createCashBoxPensionOrder = useMutation({
    mutationFn: async (dto: CashBoxPensionCreateDto) => {
      const { data } = await api.post<CashBoxPension>('/fixed_incomes/cash_pension', dto, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      await queryClient.invalidateQueries('assetsSummary')

      return data
    }
  })

  const updateCashBoxPensionOrder = useMutation({
    mutationFn: async (dto: CashBoxPensionUpdateDto) => {
      const { id, description, value, type } = dto

      const { data } = await api.patch<CashBoxPension>(`/fixed_incomes/cash_pension/${id}`, {
        description,
        value,
        type
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      await queryClient.invalidateQueries('assetsSummary')

      return data
    }
  })

  const deleteCashBoxPensionOrder = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/fixed_incomes/cash_pension/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      await queryClient.invalidateQueries('assetsSummary')
    }
  })

  return { getStockOrders, createStockOrder, updateStockOrder, deleteStockOrder, createCashBoxPensionOrder, updateCashBoxPensionOrder, deleteCashBoxPensionOrder}
}

export default useOrders