import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import useOrders from '@/hooks/assets/use-orders'
import { CashBoxPension } from '@/models/assets/fixed-income'
import EditCashForm from './edit-cash-form'

interface Props {
  selectedItem: CashBoxPension | undefined
  setSelectedItem: (order: CashBoxPension | undefined) => void
  openDialog: boolean
  setOpenDialog: (open: boolean) => void
}

export default function EditCashBoxDialog({ selectedItem, setSelectedItem, openDialog, setOpenDialog }: Props) {
  const { deleteCashBoxPensionOrder } = useOrders()

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          size='icon'
          onClick={() => setSelectedItem(undefined)}
        >
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-full max-w-[358px] border-none bg-card2 text-card2-foreground rounded-lg'>
        <DialogHeader>
          <div className='w-full flex justify-between items-baseline'>
            <DialogTitle>{selectedItem ? 'Edit Order' : 'Add Stock Order'}</DialogTitle>
            {selectedItem && (
              <Button size='icon' variant='destructive'
                onClick={() => {
                  deleteCashBoxPensionOrder.mutate(selectedItem.id)
                  setOpenDialog(false)
                }}
              >
                <Trash2Icon />
              </Button>
            )}
          </div>
        </DialogHeader>
        <EditCashForm
          closeDialog={() => setOpenDialog(false)}
          selectedItem={selectedItem}
        />
      </DialogContent>
    </Dialog>
  )
}