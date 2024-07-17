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
import { FixedIncome } from '@/models/assets/fixed-income'
import EditFixedIncomeForm from './edit-fixed-income-form'

interface Props {
  selectedItem: FixedIncome | undefined
  setSelectedItem: (item: FixedIncome | undefined) => void
  openDialog: boolean
  setOpenDialog: (open: boolean) => void
}

export default function EditFixedIncomeDialog({ selectedItem, setSelectedItem, openDialog, setOpenDialog }: Props) {
  const { deleteFixedIncomeOrder } = useOrders()

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
            <DialogTitle>{selectedItem ? 'Edit Fixed Income' : 'Add Fixed Income'}</DialogTitle>
            {selectedItem && (
              <Button size='icon' variant='destructive'
                onClick={() => {
                  deleteFixedIncomeOrder.mutate(selectedItem.id)
                  setOpenDialog(false)
                }}
              >
                <Trash2Icon />
              </Button>
            )}
          </div>
        </DialogHeader>
        <EditFixedIncomeForm
          closeDialog={() => setOpenDialog(false)}
          selectedItem={selectedItem}
        />
      </DialogContent>
    </Dialog>
  )
}