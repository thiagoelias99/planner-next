import ModuleBar from '@/components/module-bar'
import StockOrdersSection from './_components/stock-order-section'
import CreateOrderDialog from './_components/create-order-dialog'

export default function OrdersPage() {
  return (
    <div className='w-full max-w-[1440px] m-auto p-4'>
      <ModuleBar title="My Orders" backHref='/assets'>
        <CreateOrderDialog />
      </ModuleBar>
      <StockOrdersSection className='mt-4' />
    </div>
  )
}
