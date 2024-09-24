import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import EditOrderForm from './edit-order-form'
import { StockOrder } from '@/models/assets/stock'
import useOrders from '@/hooks/assets/use-orders'

interface Props {
  selectedOrder: StockOrder | undefined
  setSelectedOrder: (order: StockOrder | undefined) => void
  openDialog: boolean
  setOpenDialog: (open: boolean) => void
}

export default function CreateOrderDialog({ selectedOrder, setSelectedOrder, openDialog, setOpenDialog }: Props) {
  const { deleteStockOrder } = useOrders()

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          size='icon'
          onClick={() => setSelectedOrder(undefined)}
        >
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-full max-w-[358px] border-none bg-card2 text-card2-foreground rounded-lg'>
        <DialogHeader>
          <div className='w-full flex justify-between items-baseline'>
            <DialogTitle>{selectedOrder ? 'Edit Order' : 'Add Stock Order'}</DialogTitle>
            {selectedOrder && (
              <Button size='icon' variant='destructive'
                onClick={() => {
                  deleteStockOrder.mutate(selectedOrder.id)
                  setOpenDialog(false)
                }}
              >
                <Trash2Icon />
              </Button>
            )}
          </div>
        </DialogHeader>
        <EditOrderForm
          closeDialog={() => setOpenDialog(false)}
          selectedOrder={selectedOrder}
        />
      </DialogContent>
    </Dialog>
  )
}
