'use client'

import { Table, TableBody, TableCell, TableFrame, TableHead, TableHeader, TableRow, TableWrapper } from '@/components/ui/table'
import useOrders from '@/hooks/assets/use-orders'
import { formatCurrency } from '@/lib/format-currency'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ClassNameValue } from 'tailwind-merge'

interface StockOrdersSectionProps {
  className?: ClassNameValue
}
export default function StockOrdersSection({ className }: StockOrdersSectionProps) {
  const { getStockOrders } = useOrders()

  return (
    <section className={cn('', className)}>
      <TableFrame>
        <span className='text-lg font-bold text-card-foreground'>Stocks</span>
        <TableWrapper className='max-h-[480px]'>
          <Table className='relative'>
            <TableHeader className=''>
              <TableRow className='hover:bg-transparent'>
                <TableHead>Order Type</TableHead>
                <TableHead>Ticker</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getStockOrders.data?.map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.orderType}</TableCell>
                  <TableCell>{order.ticker}</TableCell>
                  <TableCell className='text-start'>{order.companyName}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{formatCurrency(order.individualPrice)}</TableCell>
                  <TableCell>{format(new Date(order.createdAt), 'yyyy/MM/d')}</TableCell>
                  <TableCell>{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </TableFrame>
      {/* </TableWrapper> */}
    </section>
  )
}
