import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PlusIcon } from 'lucide-react'
import EditOrderForm from './edit-order-form'
import { StockOrder } from '@/models/assets/stock'

interface Props {
  selectedOrder: StockOrder | undefined
  setSelectedOrder: (order: StockOrder | undefined) => void
  openDialog: boolean
  setOpenDialog: (open: boolean) => void
}

export default function CreateOrderDialog({ selectedOrder, setSelectedOrder, openDialog, setOpenDialog }: Props) {
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
          <DialogTitle>{selectedOrder ? 'Edit Order' : 'Add Stock Order'}</DialogTitle>
        </DialogHeader>
        <EditOrderForm
          closeDialog={() => setOpenDialog(false)}
          selectedOrder={selectedOrder}
        />
      </DialogContent>
    </Dialog>
  )
}
