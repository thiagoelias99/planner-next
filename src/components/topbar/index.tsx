import { Menu } from 'lucide-react'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '../ui/sheet'

interface Props {
  height: string
}

const TopBar = ({ height }: Props) => {
  return (
    <header className={`w-screen fixed h-${height} px-4 py-2 bg-card`}>
      <Sheet>
        <SheetTrigger asChild>
          <Button size='icon' variant='ghost'>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='h-full flex flex-col'>
          <SheetHeader>
            <div>
              header
            </div>
          </SheetHeader>
          <div className='flex-1'>
            meio
          </div>
          <SheetFooter>
            <div>
              footer
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default TopBar